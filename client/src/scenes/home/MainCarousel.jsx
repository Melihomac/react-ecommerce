import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  // useMediaQuery hook'u componentin içinde kullanılmalı
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Mobilde sadece 0. indeksi, diğer cihazlarda 1. indeksi göstermek için indexToShow değişkeni
  const indexToShow = isMobile ? 1 : 0;

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}>
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}>
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}>
      {/* Belirli indeksi gösterme mantığı */}
      {Object.values(heroTextureImports)
        .filter((_, index) => index === indexToShow)
        .map((texture, index) => (
          <Box key={`carousel-image-${index}`}>
            <img
              src={texture}
              alt={`carousel-${index}`}
              style={{
                width: "100%",
                height: "1125px",
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
          </Box>
        ))}
    </Carousel>
  );
};

export default MainCarousel;

// eslint-disable-next-line no-lone-blocks
{
  /* <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}>
            <Typography color={shades.secondary[200]}>-- Yeni Ürünler</Typography>
            <Typography variant="h1">Indirim</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}>
              Keşfet
            </Typography>
          </Box>
        </Box> */
}
