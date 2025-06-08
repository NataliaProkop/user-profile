import { useProfile } from "@/context/user-profile.context";
import { UserAvatar } from "@carbon/icons-react";
import { Button, Heading } from "@carbon/react";
import { Edit } from "@carbon/icons-react";
import { format } from "date-fns";
import "./profile.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { DATE_FORMAT } from "@/types";
import type { FC } from "react";
import { IMAGE_SIZES } from "../user-form/user-form.types";

const Profile: FC = () => {
  const { profile } = useProfile();
  return (
    <div className="profile-view">
      <Heading className="profile-view__title">Profile Page</Heading>
      <div className="profile-view__profile-box">
        <div className="profile-view__avatar-container">
          {profile?.avatar ? (
            <picture>
              <source
                media={`(max-width: ${IMAGE_SIZES.medium})`}
                srcSet={profile.avatar.small}
              />
              <source
                media={`(max-width: ${IMAGE_SIZES.large})`}
                srcSet={profile.avatar.medium}
              />
              <img
                loading="lazy"
                className="profile-view__avatar"
                src={profile.avatar.large}
                alt="User avatar"
              />
            </picture>
          ) : (
            <UserAvatar size={120} aria-label="User avatar placeholder" />
          )}
        </div>
        <div className="profile-view__details-box">
          {profile ? (
            <dl className="profile-view__details">
              <div className="profile-view__detail">
                <dt>First Name</dt>
                <dd>{profile.firstName}</dd>
              </div>
              <div className="profile-view__detail">
                <dt>Last Name</dt>
                <dd>{profile.lastName}</dd>
              </div>
              <div className="profile-view__detail">
                <dt>Date of Birth</dt>
                <dd>{format(profile.birthday, DATE_FORMAT)}</dd>
              </div>
              <div className="profile-view__detail">
                <dt>Phone Number</dt>
                <dd>{profile.phone}</dd>
              </div>
              <div className="profile-view__detail">
                <dt>Email Address</dt>
                <dd>{profile.email}</dd>
              </div>
              {profile.about && (
                <div className="profile-view__detail">
                  <dt>About Me</dt>
                  <dd>{profile.about}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="profile-view__empty">
              You haven’t added your profile details yet. Complete your profile
            </p>
          )}
          <Button
            kind="tertiary"
            renderIcon={Edit}
            iconDescription="Edit profile"
            as={Link}
            to={ROUTES.home}
            className="profile-view__edit-button"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
