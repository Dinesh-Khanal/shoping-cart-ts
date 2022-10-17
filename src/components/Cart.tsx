import React from "react";
import { CartItemType } from "../App";
import { Typography, Box } from "@mui/material";
import CartItem from "./CartItem";

type Props = {
  cartItems: CartItemType[];
  addToCart: (cartItem: CartItemType) => void;
  removeFromCart: (cartItem: CartItemType) => void;
};
const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  let totalPrice = cartItems.reduce(
    (acc, itm) => itm.amount * itm.price + acc,
    0
  );
  return (
    <Box p={2} width="350px" textAlign="center" role="presentation">
      <Typography variant="h6" component="div">
        Your Shopping Cart
      </Typography>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {cartItems.map((cartItem) => (
        <CartItem
          cartItem={cartItem}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </Box>
  );
};

export default Cart;
