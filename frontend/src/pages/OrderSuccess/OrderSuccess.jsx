import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  const userLocalId = localStorage.getItem("userId");
  if (!userLocalId) {
    alert("User not found. Please log in.");
    navigate("/signIn");
    return;
  }

  return (
    <div className="successContainer pt-3 pb-3">
      <div style={styles.container}>
        <h1>Order Placed Successfully!</h1>
        <img
          className="successImg"
          src="/assets/success-tick-dribbble.gif" // Corrected path
          alt="Order Success"
          style={styles.gif}
        />
        <p>Thank you for shopping with us!</p>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  gif: {
    width: "600px",
    height: "auto",
    marginTop: "20px",
  },
};

export default OrderSuccess;
