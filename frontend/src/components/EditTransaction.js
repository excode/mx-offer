import React, { Fragment, useState } from "react";

const EditTransaction = ({ transaction }) => {
  const [email, setEmail] = useState(transaction.email)
  const [offerId, setOfferId] = useState(transaction.offerId)
  //edit description function
  const updateTransaction = async e => {
   e.preventDefault()
    try {
      const body = { email,offerId };
      const response = await fetch(
        `http://localhost:5000/transactions/${transaction.transaction_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${transaction.transaction_id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${transaction.id}`}
       
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit transaction</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
               
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={transaction.email}
                onChange={e => setEmail(e.target.value)}
              />


            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={transaction.offerId}
                onChange={e => setOfferId(e.target.value)}
              />


            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateTransaction(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
             
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTransaction;
