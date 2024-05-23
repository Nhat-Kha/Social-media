import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="flex gap-8 justify-right">
      <img
        src={Noti}
        alt=""
        className="w-[1.5rem] h-[1.5rem] hover:cursor-pointer"
      />
      <Link to="../chat" className="cursor-pointer">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
