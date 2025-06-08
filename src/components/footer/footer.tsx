import { Stack, Theme } from "@carbon/react";
import "./footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <Theme theme="g10">
        <Stack className="footer__container" gap={7}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem
            velit, ullamcorper et facilisis nec, mollis in neque. Nunc justo
            felis, fringilla eu interdum non, vulputate et metus. Donec eu sem
            vel augue elementum vehicula eu sed sapien.
          </p>
          <small className="footer__copyright">
            &copy; {new Date().getFullYear()} User Profile App. All rights
            reserved.
          </small>
        </Stack>
      </Theme>
    </footer>
  );
};

export default Footer;
