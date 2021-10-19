import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import {Button} from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/Lading-pages.mp4' autoPlay loop muted />
      <h1>Welcome!</h1>
      <div className='hero-btns'>
        <Link to='/home'>
        <Button
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Inicio
        </Button>
        </Link>
      </div>
    </div>
  );
}
export default HeroSection;