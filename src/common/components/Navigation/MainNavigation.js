import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = props => {
  const [isdrawerOpen, setIsdrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsdrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsdrawerOpen(false)
  }
  return (
    <>
      {isdrawerOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer className='main-navigation__drawer-nav' show={isdrawerOpen} onClick={closeDrawer}>
        <NavLinks />
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h2 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h2>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
