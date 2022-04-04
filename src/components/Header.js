import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = function () {
  return (
    <div className="ui secondary poiting menu">
      <Link to="/" className="item">
        Streamer
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
