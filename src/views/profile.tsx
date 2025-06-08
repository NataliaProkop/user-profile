import { useProfile } from "@/context/user-profile.context";
import { Heading, Section } from "@carbon/react";

function Profile() {
  const { profile } = useProfile();
  return (
    <>
      <Heading>Profile Page</Heading>
      <Section aria-labelledby="profile-overview">
        <Heading id="profile-overview">User Overview</Heading>
        <img
          src={profile?.avatar}
          alt="User Avatar"
          className="profile-avatar"
        />
      </Section>
      c
      <Section aria-labelledby="basic-info">
        <Heading id="basic-info">Basic Information</Heading>
        <div className="profile-info">
          <label htmlFor="first-name">First Name:</label>
          <span id="first-name">{profile?.firstName}</span>

          <label htmlFor="last-name">Last Name:</label>
          <span id="last-name">{profile?.lastName}</span>

          <label htmlFor="email">Email:</label>
          <span id="email">{profile?.email}</span>

          <label htmlFor="phone">Phone Number:</label>
          <span id="phone">{profile?.phone}</span>

          <label htmlFor="birthday">Birthday:</label>
          <span id="birthday">{}</span>
        </div>
      </Section>
      <Section aria-labelledby="about-me">
        <Heading id="about-me">About Me</Heading>
        <p id="about-text">{profile?.about}</p>
      </Section>
    </>
  );
}

export default Profile;
