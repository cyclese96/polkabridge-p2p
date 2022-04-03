import React from "react";
import { makeStyles } from "@mui/styles";
import PriceCard from "./components/PriceCard";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Box p={2} pt={4}>
      <h5 style={{ paddingLeft: 10 }}>Top Pools</h5>
      <div className="d-flex justify-content-start">
        <Box p={2}>
          <PriceCard />
        </Box>
        <Box p={2}>
          <PriceCard />
        </Box>
        <Box p={2}>
          <PriceCard />
        </Box>
        <Box p={2}>
          <PriceCard />
        </Box>
      </div>
    </Box>
  );
}
