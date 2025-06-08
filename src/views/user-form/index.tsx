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
import * as yup from "yup";
import "yup-phone-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useProfile } from "@/context/user-profile.context";
import "./user-form.scss";
import type { UserProfile } from "@/types";

interface UserFormData extends Omit<UserProfile, "avatar"> {
  avatar?: Blob;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().phone("IN").required(),
    birthday: yup.date().max(new Date()).required(),
    about: yup.string(),
    avatar: yup.mixed(),
  })
  .required();

function UserForm() {
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      about: "",
    },
    resolver: yupResolver(schema),
  });
  const { updateProfile } = useProfile();

  const { handleSubmit } = formMethods;

  const converImgToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        resolve(e.target?.result as string);
      });
      reader.readAsDataURL(blob);
      reader.onerror = () => {
        reject(new Error("Unable to read.."));
      };
    });
  };

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    const { avatar, ...userData } = data;
    let base64Avatar;
    if (avatar) {
      base64Avatar = await converImgToBase64(avatar);
    }
    await updateProfile({ ...userData, avatar: base64Avatar });
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
                  />
                </Column>
                <Column sm={4} md={8} lg={8}>
                  <FormDatePickerInput
                    className="user-form__date-picker"
                    name="birthday"
                    id="birthday"
                    labelText="Date of Birth"
                    placeholder="mm/dd/yyyy"
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
            />
            <FormGroup legendText="Avatar">
              <FormFileUploader
                name="avatar"
                labelDescription="Supported file types are .jpg and .png."
                accept={[".jpg", ".png"]}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      </FormProvider>
    </div>
  );
}

export default UserForm;
