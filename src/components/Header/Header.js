import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <Logo />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
      </MainHeader>
    </header>
  );
};

const MainHeader = styled.div`
  padding: 0 32px;
  border-bottom: 1px solid ${COLORS.gray[300]};

  height: 72px;
  display: flex;
  align-items: center;

  ${'' /* This isn't exactly right, but I couldn't figure out how to keep the 
  logo left-aligned while centering the nav. Tried a lot of different combos of 
  align-items, justify-content, align-self, position: relative, position: 
  absolute, etc etc... I could have looked it up but I'm trying 
  to complete these exercises solely based on what I remember from the course. 
  */}
  justify-content: space-between;

  ${'' /* When window is horizonally small, make it so the logo and nav aren't 
  squished up against each other. */}
  gap: 16px;  
`;

const Nav = styled.nav`
  display: flex;
  gap: 44px;
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
