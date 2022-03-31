import React, { Fragment, useEffect, useState } from "react";

import EditTransaction from "./EditTransaction";

const ListTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  //delete todo function

  const deleteTransaction = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/transaction/${id}`, {
        method: "DELETE"
      });

      setTransactions(transactions.filter(tran => tran.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transaction");
      const jsonData = await response.json();

      setTransactions(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  console.log(transactions);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
          <th>ID</th>
            <th>Email</th>
            <th>Offer</th>
            <th>date</th>
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
          {transactions.map(t => (
            <tr key={t.id}>
               <td>{t.id}</td>
              <td>{t.email}</td>
              <td>{t.description}</td>
              <td>{t.datetime}</td>
              <td>
                <EditTransaction transaction={t} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTransaction(t.id)}
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

export default ListTransactions;
