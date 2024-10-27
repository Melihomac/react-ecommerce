import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    try {
      const response = await fetch(
        "http://localhost:1337/api/items?populate=image",
        { method: "GET" }
      );
      const itemsJson = await response.json();

      if (itemsJson && itemsJson.data) {
        dispatch(setItems(itemsJson.data));
      } else {
        console.error("No items found in the response:", itemsJson);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const newArrivalsItems = items.filter(
    (item) => item.category === "düğün-nişan-kına-söz"
  );
  const topRatedItems = items.filter((item) => item.category === "babyShower");
  const bestSellersItems = items.filter(
    (item) => item.category === "doğumGünü"
  );

  console.log("Top Rated Items:", topRatedItems);
  console.log("New Arrivals Items:", newArrivalsItems);
  console.log("Best Sellers Items:", bestSellersItems);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        <b>ÖNE ÇIKANLAR </b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}>
        <Tab label="Hepsi" value="all" />
        <Tab label="Düğün Davetiyeleri" value="düğün-nişan-kına-söz" />
        <Tab label="Doğum Günü Davetiyeleri" value="doğumGünü" />
        <Tab label="Baby Shower Davetiyeleri" value="babyShower" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%">
        {value === "all" &&
          items
            .filter(Boolean)
            .map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        {value === "düğün-nişan-kına-söz" &&
          newArrivalsItems
            .filter(Boolean)
            .map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        {value === "doğumGünü" &&
          bestSellersItems
            .filter(Boolean)
            .map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        {value === "babyShower" &&
          topRatedItems
            .filter(Boolean)
            .map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
