import React from "react";
import styled from "@emotion/styled";
import { CartItemType } from "../App";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
  align-items: center;
  border-top: 1px solid black;
  h3 {
    font-size: 14px;
    width: 60%;
  }
  button {
    padding: 10px;
    font-size: 20px;
    color: white;
    background-color: blueviolet;
    border: none;
    border-radius: 5px;
  }
  p {
    font-size: 14px;
    font-weight: bold;
  }
`;
type Props = {
  cartItem: CartItemType;
  addToCart: (cartItem: CartItemType) => void;
  removeFromCart: (cartItem: CartItemType) => void;
};
const CartItem = ({ cartItem, addToCart, removeFromCart }: Props) => {
  return (
    <Wrapper>
      <h3>{cartItem.title}</h3>
      <button onClick={() => addToCart(cartItem)}>+</button>
      <p>{cartItem.amount}</p>
      <button onClick={() => removeFromCart(cartItem)}>-</button>
    </Wrapper>
  );
};

export default CartItem;
