import React, { Fragment } from "react";
import InputUser from "./components/InputUser";
import ListUser from "./components/ListUser";



const User=()=> {


  return (
    <Fragment>
      <div className="container">
        <InputUser />
        <ListUser />
      </div>
    </Fragment>
  );
}
export default User;