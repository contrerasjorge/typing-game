import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
  StyledButtonLink,
} from '../styled/Navbar';
import { StyledButton } from '../styled/Button';
import { Accent } from '../styled/Reusable';
import { useAuth0 } from '../auth';

export default function Navbar({ toggleTheme }) {
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          ~Typing~<Accent>Fun</Accent>~
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <StyledButtonLink onClick={loginWithRedirect}>
              Login
            </StyledButtonLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButtonLink onClick={logout}>Logout</StyledButtonLink>
          </li>
        )}
        <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
      </StyledNavItems>
    </StyledNavbar>
  );
}
