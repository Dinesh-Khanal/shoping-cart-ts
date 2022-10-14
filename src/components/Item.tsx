import React from "react";
import styled from "@emotion/styled";
import { CartItemType } from "../App";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: 1px solid blue;
  border-radius: 10px;
  height: 100%;
  button {
    border-radius: 0 0 10px 10px;
    padding: 10px;
  }
  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
  div {
    padding: 10px;
  }
`;

type IProp = {
  item: CartItemType;
};

const Item = ({ item }: IProp) => {
  return (
    <Wrapper>
      <img src={item.image} alt="" />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <button>add item</button>
    </Wrapper>
  );
};

export default Item;
