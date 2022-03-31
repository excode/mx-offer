import React, { Fragment } from "react";
import InputTransaction from "./components/InputTransaction";
import ListTransaction from "./components/ListTransaction";



const Transaction=()=> {


  return (
    <Fragment>
      <div className="container">
        <InputTransaction />
        <ListTransaction />
      </div>
    </Fragment>
  );
}
export default Transaction;