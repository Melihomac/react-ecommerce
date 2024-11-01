import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, useMediaQuery } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import logo from "../../assets/logo/logo.png";
import { setIsCartOpen } from "../../state";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { user, isLoading, setUser } = useAuthContext();
  const firstLetter = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "";
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255,255,255,0.95"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1">
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Box
          onClick={() => navigate("/")}
          sx={{
            "&:hover": { cursor: "pointer" },
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "48px",
            marginTop: isMobile ? "20px" : "0px",
          }}
          color={shades.secondary[500]}></Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2">
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          {!user ? (
            <IconButton sx={{ color: "black" }}>
              <PersonOutline onClick={() => navigate("/signin")} />
            </IconButton>
          ) : (
            <Box
              sx={{
                marginTop: "5px",
                width: "25px", // kutunun genişliğini belirle
                height: "25px", // kutunun yüksekliğini belirle
                display: "flex", // içeriği ortalamak için flex
                alignItems: "center", // dikey ortalama
                justifyContent: "center", // yatay ortalama
                border: "1px solid", // kenarlık ekle
                borderRadius: "50%", // daire yapmak için
                backgroundColor: "#f0f0f0", // arka plan rengi
                cursor:"pointer"
              }}
              onClick={() => navigate("/profile")}>
              {firstLetter}
            </Box>
          )}

          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}>
            <IconButton
              onClick={() => {
                dispatch(setIsCartOpen({}));
              }}
              sx={{ color: "black" }}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
