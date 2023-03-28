import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faFloppyDisk,
  faFolderOpen,
  faCodeCompare,
  faGear,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/style.css';
import { usePort } from '../contexts/PortContext';

const MainNav = () => {
  const port = usePort();

  function handleConnect() {
    if (port) {
      port.disconnect();
    }
  }
  return (
    <nav id='main-nav'>
      <button type='button' className='main-nav-btn' onClick={handleConnect}>
        <FontAwesomeIcon icon={faCircle} />
      </button>
      <button type='button' className='main-nav-btn'>
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      <button type='button' className='main-nav-btn'>
        <FontAwesomeIcon icon={faFolderOpen} />
      </button>
      <button type='button' className='main-nav-btn'>
        <FontAwesomeIcon icon={faCodeCompare} />
      </button>
      <button type='button' className='main-nav-btn'>
        <FontAwesomeIcon icon={faGear} />
      </button>
      <button type='button' className='main-nav-btn'>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
    </nav>
  );
};

export default MainNav;
