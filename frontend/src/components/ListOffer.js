import React, { Fragment, useEffect, useState } from "react";

import EditOffer from "./EditOffer";

const ListOffers = () => {
  const [offers, setOffers] = useState([]);

  //delete offer function

  const deleteoffer = async id => {
    try {
      const deleteoffer = await fetch(`http://localhost:5000/offer/${id}`, {
        method: "DELETE"
      });

      setOffers(offers.filter(offer => offer.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getoffers = async () => {
    try {
      const response = await fetch("http://localhost:5000/offer");
      const jsonData = await response.json();

      setOffers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getoffers();
  }, []);

  console.log(offers);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
          <th>Offer ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {offers.map(offer => (
            <tr key={offer.id}>
                <td>{offer.id}</td>
              <td>{offer.description}</td>
              <td>
                <EditOffer offer={offer} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteoffer(offer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListOffers;
