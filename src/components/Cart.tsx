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
  return (
    <Box p={2} width="350px" textAlign="center" role="presentation">
      <Typography variant="h6" component="div">
        Your Shopping Cart
      </Typography>
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
