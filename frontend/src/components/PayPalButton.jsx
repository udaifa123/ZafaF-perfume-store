import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

export default function PayPalButton({ amount, cartItems, shippingAddress, onSuccess }) {
  const createOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/paypal/create-order`,
      { amount, cartItems, shippingAddress },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.orderID; // must return orderID
  };

const onApprove = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/paypal/capture-order/${data.orderID}`, // <--- use URL param
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (onSuccess) onSuccess(res.data);
  } catch (err) {
    console.error(err);
    alert("PayPal capture failed!");
  }
};


  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD" }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
}
