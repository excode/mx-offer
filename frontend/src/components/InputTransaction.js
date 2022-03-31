import React, { Fragment, useState,useEffect } from "react";

const InputTransaction= () => {
  const [email, setEmail] = useState("");
  const [offerId, setOfferId] = useState("");
  const [offers, setOffer] = useState([]);
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, offerId};
      const response = await fetch("http://localhost:5000/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const getOfferes = async () => {
    try {
      const response = await fetch("http://localhost:5000/offer");
      const jsonData = await response.json();

      setOffer(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOfferes();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center mt-5">Transaction List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        Email:
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        Offer ID:
        <select class="form-control"
           
            onChange={e => setOfferId(e.target.value)}
            >
            {offers.map(({ id, description }, index) => <option value={id}  key={id}>{description}</option>)}
            </select>
         
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTransaction;
