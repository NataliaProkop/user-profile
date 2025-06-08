import { useState, type FC } from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  HeaderMenuButton,
} from "@carbon/react";
import { UserAvatar } from "@carbon/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";

export const HeaderPage: FC = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <Header aria-label="My App">
      <HeaderMenuButton
        aria-label="Open menu"
        isActive={isSideNavExpanded}
        onClick={() => setIsSideNavExpanded((prev) => !prev)}
      />
      <HeaderName prefix="" as={Link} to={ROUTES.home}>
        <img
          src="/logo.svg"
          alt="App Logo"
          style={{ height: 32, marginRight: 8 }}
        />
        User Profile App
      </HeaderName>

      <HeaderNavigation aria-label="My App Navigation" className="hidden-md">
        <HeaderMenuItem as={Link} to={ROUTES.home}>
          Home
        </HeaderMenuItem>
        <HeaderMenuItem as={Link} to={ROUTES.profile}>
          Profile
        </HeaderMenuItem>
      </HeaderNavigation>

      <HeaderGlobalBar>
        <Link to={ROUTES.profile} style={{ display: "inline-block" }}>
          <HeaderGlobalAction aria-label="account">
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        </Link>
      </HeaderGlobalBar>

      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isPersistent={false}
      >
        <SideNavItems>
          <SideNavLink as={Link} to={ROUTES.home}>
            Home
          </SideNavLink>
          <SideNavLink as={Link} to={ROUTES.profile}>
            Profile
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    </Header>
  );
};
