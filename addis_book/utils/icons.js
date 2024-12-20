import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faBagShopping,
  faBasketShopping,
  faBell,
  faHouse,
  faUser,
  faUtensils,
  faMagnifyingGlass,
  faClock,
  faAnglesRight,
  faCirclePlus,
  
} from '@fortawesome/free-solid-svg-icons';

export const setupIcons = () => {
  library.add(
    fab,
    faHouse,
    faBasketShopping,
    faBell,
    faUser,
    faUtensils,
    faBagShopping,
    faMagnifyingGlass,
    faClock,
    faAnglesRight,
    faCirclePlus
  );
};
