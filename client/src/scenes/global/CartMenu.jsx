import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const [itemData, setItemData] = useState([]);
  const { documentId } = useParams();
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const renderLongDescription = (longDescription) => {
    return longDescription.map((paragraph, index) => (
      <Typography key={index} sx={{ mt: "20px" }}>
        {paragraph.children.map((child, idx) => child.text)}
      </Typography>
    ));
  };

  async function getItem() {
    const matchedItems = cart.filter((cartItem) => cartItem.id === documentId);

    const fetchedItems = await Promise.all(
      matchedItems.map(async (matchedItem) => {
        const response = await fetch(
          `http://localhost:1337/api/items/${matchedItem.id}?populate=image`,
          {
            method: "GET",
          }
        );
        const itemJson = await response.json();
        return itemJson.data;
      })
    );

    setItemData(fetchedItems);
  }

  useEffect(() => {
    getItem();
  }, [cart, documentId]); // Trigger the effect when cart or documentId changes

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto">
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white">
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">Sepetim ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="150px"
                      height="250px"
                      src={`http://localhost:1337${item.image[1]?.url}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    {/* Render long description if available */}
                    {item?.longDescription ? (
                      renderLongDescription(item.longDescription)
                    ) : (
                      <Typography>{item.shortDescription}</Typography>
                    )}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}>
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }>
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">{item.price} TL</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          {cart.map((item) => (
            <>
              <FlexBox key={`${item.name}-${item.id}`} p="15px 0">
                <Typography fontWeight="bold">{item.name}</Typography>
              </FlexBox>
              <Button
                sx={{
                  backgroundColor: shades.primary[400],
                  color: "white",
                  borderRadius: 0,
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                }}
                onClick={() => {
                  navigate(`/checkout/${item.documentId}`); // Navigate to checkout for this item
                  dispatch(setIsCartOpen({}));
                }}>
                Ödemeye Git
              </Button>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
