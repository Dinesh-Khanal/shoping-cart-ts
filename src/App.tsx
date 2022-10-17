import React, { useState } from "react";
import styled from "@emotion/styled";
import Item from "./components/Item";
import Cart from "./components/Cart";
import { useQuery } from "react-query";
import { LinearProgress, Grid, Drawer, IconButton, Badge } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
const Wrapper = styled.div`
  margin: 50px auto;
  width: 90%;
`;
const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<[CartItemType]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

function App() {
  const { data, isLoading, error } = useQuery("products", getProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const addToCart = (cartItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((itm) => itm.id === cartItem.id);

      if (isItemInCart) {
        return prev.map((itm) =>
          itm.id === cartItem.id ? { ...itm, amount: itm.amount + 1 } : itm
        );
      }
      // First time the item is added
      return [...prev, { ...cartItem, amount: 1 }];
    });
  };

  const removeFromCart = (cartItem: CartItemType) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === cartItem.id) {
          if (item.amount > 1) {
            return [...ack, { ...item, amount: item.amount - 1 }];
          }
          return ack;
        }
        return [...ack, item];
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce(
      (accAmount: number, item) => accAmount + item.amount,
      0
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ....</div>;
  return (
    <Wrapper>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </Drawer>
      <Grid container spacing={4}>
        {data?.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Item item={item} handleAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
