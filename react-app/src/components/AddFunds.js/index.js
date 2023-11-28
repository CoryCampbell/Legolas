import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AddFunds = () => {
  const user = useSelector(state => state.session.user)
  
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/addfunds/add_funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id, amount: parseFloat(amount) }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Funds added. New balance: ${data.new_balance}`);
        setAmount(0);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending request");
    }

    setTimeout(() => {
      setMessage('');
  }, 3000);
  };

  return (
    <div className="add-funds-container">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Funds</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddFunds;
