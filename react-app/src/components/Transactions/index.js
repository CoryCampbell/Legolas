import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserTransactionsThunk } from "../../store/transactions.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";

export default function Transactions() {
  const { user_id } = useParams();
  const transactions = useSelector(
    (state) => state.transactions.currentUserTransactions
  );
  const dispatch = useDispatch();

  console.log(transactions);

  //   console.log(getUserTransactionsThunk);

  useEffect(() => {
    dispatch(getUserTransactionsThunk(user_id));
  }, [dispatch, user_id]);

  return (
    <>
      <div>Transactions</div>
    </>
  );
}
