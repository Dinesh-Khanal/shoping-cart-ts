import React, { useState } from "react";
import styled from "@emotion/styled";
import Item from "./components/Item";
import { useQuery } from "react-query";
import {
  LinearProgress,
  Grid,
  Drawer,
  Box,
  Typography,
  Button,
} from "@mui/material";

const Wrapper = styled.div`
  margin: auto;
  width: 90%;
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
  const addToCart = (item: CartItemType) => {
    console.log(item);
  };
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ....</div>;
  return (
    <Wrapper>
      <Button variant="text" onClick={() => setCartOpen(true)}>
        CART
      </Button>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Side Panel
          </Typography>
        </Box>
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
