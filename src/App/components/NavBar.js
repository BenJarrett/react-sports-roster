import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../../helpers/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const authenticated = () => (
    <>
    <NavItem>
    <Link className="nav-link" to="/add-players/">Add to Roster</Link>
  </NavItem>
  <NavItem>
    <Link className="nav-link" to="/players">View Team Roster</Link>
  </NavItem>
  </>
  );
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">React</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { user && authenticated()}
            <NavItem>
              {
                user !== null
                && <NavItem>
                  {
                    user
                      ? <Button backgroundColor='B3CBB9' onClick={signOutUser}>Sign Out</Button>
                      : <Button backgroundColor='B3CBB9' onClick={signInUser}>Sign In</Button>
                  }
                </NavItem>
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
NavBar.propTypes = {
  user: PropTypes.any
};
export default NavBar;
