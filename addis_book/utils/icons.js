import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faHouse,
  faUser,
  faUtensils,
  faMagnifyingGlass,
  faClock,
  faAnglesRight,
  faCirclePlus,
  faEye,
  faEyeSlash,
  faHeadphones,
  faBookOpen,
  faGear,
  faBars,
  faPlayCircle
} from '@fortawesome/free-solid-svg-icons';

export const setupIcons = () => {
  library.add(
    fab,
    faHouse,
    faBell,
    faUser,
    faUtensils,
    faMagnifyingGlass,
    faClock,
    faAnglesRight,
    faCirclePlus,
    faEye,
    faEyeSlash,
    faHeadphones,
    faBookOpen,
    faGear,
    faBars,
    faPlayCircle
  );
};
