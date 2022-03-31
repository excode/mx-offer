import React, { Fragment } from "react";
import InputOffer from "./components/InputOffer";
import ListOffer from "./components/ListOffer";



const Offer=()=> {


  return (
    <Fragment>
      <div className="container">
        <InputOffer />
        <ListOffer />
      </div>
    </Fragment>
  );
}
export default Offer;