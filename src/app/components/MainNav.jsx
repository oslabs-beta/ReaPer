import React, { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faFloppyDisk,
  faFolderOpen,
  faCodeCompare,
  faGear,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../contexts/Context';


const MainNav = (props) => {
  const context = useContext(Context);

  // useEffect(() => {

  // }, [props]);

  return (
    <nav id="main-nav">
      <button type="button" className="main-nav-btn record" onClick={() => props.handleRecordBtnClick()} recording={`${props.sessionStatus === true}`}>
        <FontAwesomeIcon icon={faCircle} />
      </button>
      <button type="button" className="main-nav-btn">
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      <button type="button" className="main-nav-btn">
        <FontAwesomeIcon icon={faFolderOpen} />
      </button>
      <button type="button" className="main-nav-btn">
        <FontAwesomeIcon icon={faCodeCompare} />
      </button>
      <button type="button" className="main-nav-btn">
        <FontAwesomeIcon icon={faGear} />
      </button>
      <button type="button" className="main-nav-btn">
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
    </nav>
  );
};

export default MainNav;
