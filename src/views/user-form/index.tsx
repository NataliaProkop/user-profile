import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormTextInput,
  FormTextArea,
  FormDatePickerInput,
  FormFileUploader,
} from "@components";
import {
  Button,
  Column,
  Stack,
  Heading,
  Grid,
  Form,
  FormGroup,
} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useProfile } from "@/context/user-profile.context";
import "./user-form.scss";
import { format } from "date-fns";
import { useEffect, type FC } from "react";
import {
  converBase64ToFile,
  resizeAndConvertToBase64,
} from "@/utils/file-helpers";
import { schema } from "./user-form-schema";
import {
  IMAGE_SIZES,
  MAX_ABOUT_LENGTH,
  SUPPORTED_FORMATS,
  type UserFormData,
} from "./user-form.types";
import { DATE_FORMAT } from "@/types";

const UserForm: FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
  const formMethods = useForm<UserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      about: "",
      birthday: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (profile) {
      formMethods.reset(
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          about: profile.about,
          birthday: format(profile.birthday, DATE_FORMAT),
          avatar:
            profile.avatar && profile.avatar.small
              ? converBase64ToFile(
                  profile.avatar.small,
                  profile.avatarName || "current_avatar",
                  "image/png"
                )
              : undefined,
        },
        { keepDirtyValues: true }
      );
    }
  }, [profile]);

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    const { avatar, birthday, ...userData } = data;

    await updateProfile({
      ...userData,
      birthday: new Date(birthday),
      avatar: avatar && {
        small: await resizeAndConvertToBase64(
          avatar,
          IMAGE_SIZES.small,
          IMAGE_SIZES.small
        ),
        medium: await resizeAndConvertToBase64(
          avatar,
          IMAGE_SIZES.medium,
          IMAGE_SIZES.medium
        ),
        large: await resizeAndConvertToBase64(
          avatar,
          IMAGE_SIZES.large,
          IMAGE_SIZES.large
        ),
      },
      avatarName: avatar?.name,
    });
    navigate(ROUTES.profile);
  };

  return (
    <div className="user-form">
      <Heading className="user-form__title">Edit Profile</Heading>
      <FormProvider {...formMethods}>
        <Form aria-labelledby="profile form " onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={7}>
            <FormGroup
              legendText="Personal Information"
              className="user-form__grid"
            >
              <Grid condensed className="user-form__personal-info-container">
                <Column sm={4} md={8} lg={8}>
                  <FormTextInput
                    className="user-form__input"
                    name="firstName"
                    id="first-name"
                    labelText="First Name"
                    autoComplete="given-name"
                  />
                </Column>
                <Column sm={4} md={8} lg={8}>
                  <FormTextInput
                    className="user-form__input"
                    name="lastName"
                    id="last-name"
                    labelText="Last Name"
                    autoComplete="family-name"
                  />
                </Column>
                <Column sm={4} md={8} lg={8}>
                  <FormTextInput
                    className="user-form__input"
                    name="email"
                    id="email"
                    labelText="Email"
                    autoComplete="email"
                  />
                </Column>
                <Column sm={4} md={8} lg={8}>
                  <FormTextInput
                    className="user-form__input"
                    name="phone"
                    id="phone-number"
                    labelText="Phone Number"
                    autoComplete="tel"
                    placeholder="+123456789"
                  />
                </Column>
                <Column sm={4} md={8} lg={8}>
                  <FormDatePickerInput
                    datePickerProps={{
                      datePickerType: "single",
                      className: "user-form__date-picker",
                    }}
                    datePickerInputProps={{
                      id: "birthday",
                      labelText: "Date of Birth",
                      placeholder: DATE_FORMAT,
                    }}
                    name="birthday"
                  />
                </Column>
              </Grid>
            </FormGroup>
            <FormTextArea
              name="about"
              id="about"
              rows={5}
              placeholder="Tell us about yourself..."
              labelText="About me"
              enableCounter
              maxCount={MAX_ABOUT_LENGTH}
            />
            <FormGroup legendText="Avatar">
              <FormFileUploader
                name="avatar"
                labelDescription="Supported file types are .jpg and .png."
                fileUploaderDropContainerProps={{
                  accept: SUPPORTED_FORMATS,
                  labelText: "Drag and drop files here or click to upload",
                }}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      </FormProvider>
    </div>
  );
};

export default UserForm;
