import React from "react";
import styled from "@emotion/styled";
import Item from "./components/Item";
import { useQuery } from "react-query";
import { LinearProgress, Grid } from "@mui/material";

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
  console.log(data);
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ....</div>;
  return (
    <Wrapper>
      <Grid container spacing={4}>
        {data?.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
