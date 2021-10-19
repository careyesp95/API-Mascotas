import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import {Link} from 'react-router-dom';
import './Nav.css';

function Nav() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
          Dog
            <div className='navbar-icon'>
              <i class="fas fa-paw"></i>
            </div>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                <div className="navbar-home">
                  <i class="fas fa-home" />
                </div>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/home/creardog'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Crear Dog
              </Link>
            </li>
          </ul>
          {button && <Link to='/'><Button buttonStyle='btn--outline'>Inicio</Button></Link>}
        </div>
      </nav>
    </>
  );
}

export default Nav;
