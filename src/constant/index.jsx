import {
  FaMehRollingEyes,
  FaStarOfDavid,
  FaCanadianMapleLeaf,
  FaCodepen,
  FaFeatherAlt,
} from "react-icons/fa";
import ava1 from "resources/images/avatar/ava1.png";
import ava2 from "resources/images/avatar/ava2.png";
import ava3 from "resources/images/avatar/ava3.png";
import ava4 from "resources/images/avatar/ava4.png";
import ava5 from "resources/images/avatar/ava5.png";
import ava6 from "resources/images/avatar/ava6.png";

export const categories = [
  { id: 1, name: "Comedy", icon: FaMehRollingEyes },
  { id: 2, name: "Sci-fi", icon: FaCodepen },
  { id: 3, name: "Romance", icon: FaCanadianMapleLeaf },
  { id: 4, name: "Fantasy", icon: FaStarOfDavid },
  { id: 5, name: "Poetry", icon: FaFeatherAlt },
];
export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const REGEX_EMAIL =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const avatarList = [ava1, ava2, ava3, ava4, ava5, ava6];
