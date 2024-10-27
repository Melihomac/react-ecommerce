import React from "react";
import { Typography, useMediaQuery, Box, Button } from "@mui/material";

const ItemDetailComponent = ({
  documentId,
  damat,
  gelin,
  metinYazi,
  etkinlikAdi,
  tarih,
  gun,
  endDate,
  kizTarafi,
  erkekTarafi,
  ekBilgi,
  konum1,
  konum2,
  isLocation,
  buton2Isim,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  switch (documentId) {
    case "do48w5iqqaylunb6viogfhnq":
      const fontSize = isMobile ? "30px" : "45px";
      const fontSizeTarih = isMobile ? "30px" : "35px";
      const fontSizeGeriSayim = isMobile ? "15px" : "20px";
      const fontButton = isMobile ? "15px" : "18px";
      const margins = {
        marginTopGelin: isMobile ? "105px" : "130px",
        marginTopDamat: isMobile ? "230px" : "310px",
        marginTopYazı: isMobile ? "300px" : "400px",
        marginTopEtkinlikAdi: isMobile ? "365px" : "490px",
        marginTopTarih: isMobile ? "405px" : "540px",
        marginTopGün: isMobile ? "435px" : "582px",
        marginTopGeriSayim: isMobile ? "530px" : "720px",
        marginTopKizTarafi: isMobile ? "615px" : "820px",
        marginTopErkekTarafi: isMobile ? "680px" : "910px",
        marginTopEkBilgi: isMobile ? "740px" : "1000px",
        marginTopKonum1: isMobile ? "800px" : "1080px",
        marginTopKonum2: isMobile ? "860px" : "1150px",
      };

      return (
        <>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSize,
              marginTop: margins.marginTopDamat,
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#8d8986",
              letterSpacing: "15px",
              width: "100%",
            }}>
            {damat}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSize,
              marginTop: margins.marginTopGelin,
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#8d8986",
              letterSpacing: "15px",
            }}>
            {gelin}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSize,
              marginTop: margins.marginTopYazı,
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "Updock",
              color: "#8d8986",
              letterSpacing: "5px",
            }}>
            {metinYazi}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: "18px",
              marginTop: margins.marginTopEtkinlikAdi,
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#3e5d6d",
              letterSpacing: "5px",
            }}>
            {etkinlikAdi}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSizeTarih,
              marginTop: margins.marginTopTarih,
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#3e5d6d",
              letterSpacing: "5px",
            }}>
            {tarih}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: "18px",
              marginTop: margins.marginTopGün,
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#3e5d6d",
              letterSpacing: "5px",
            }}>
            {gun}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSizeGeriSayim,
              marginTop: margins.marginTopGeriSayim,
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#3e5d6d",
              letterSpacing: "5px",
            }}>
            {endDate}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSizeGeriSayim,
              marginTop: margins.marginTopKizTarafi,
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "Frunchy Sage",
              color: "#8d8986",
              letterSpacing: "0px",
              width: "60%",
            }}>
            {kizTarafi}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSizeGeriSayim,
              marginTop: margins.marginTopErkekTarafi,
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "Frunchy Sage",
              color: "#8d8986",
              letterSpacing: "0px",
              width: "60%",
            }}>
            {erkekTarafi}
          </Box>
          <Box
            sx={{
              position: "absolute",
              fontSize: "18px",
              marginTop: margins.marginTopEkBilgi,
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "Nunito",
              color: "#8d8986",
              letterSpacing: "2px",
              width: "60%",
            }}>
            {ekBilgi}
          </Box>
          <Button
            sx={{
              position: "absolute",
              fontSize: fontButton,
              marginTop: margins.marginTopKonum1,
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "Caudex",
              color: "black",
              letterSpacing: "2px",
              width: "80%",
              borderRadius: "20px",
              border: "2px solid black",
            }}
            onClick={() => {
              window.open(konum1);
            }}>
            {etkinlikAdi} Konumuna Git
          </Button>
          {isLocation === true ? (
            <Button
              sx={{
                position: "absolute",
                fontSize: "18px",
                marginTop: margins.marginTopKonum2,
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                fontFamily: "Caudex",
                color: "black",
                letterSpacing: "2px",
                width: "80%",
                borderRadius: "20px",
                border: "2px solid black",
              }}
              onClick={() => {
                window.open(konum2);
              }}>
              {buton2Isim}
            </Button>
          ) : null}
        </>
      );

    case "s974zqdgsldbnheut43322j6":
      return (
        <>
          {/* Similar structure as case "h6aguxvt0jdeqj9bbagx39th" */}
          <Box
            sx={{
              position: "absolute",
              fontSize: fontSize,
              marginTop: margins.marginTopDamat,
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontFamily: "The Seasons",
              color: "#8d8986",
              letterSpacing: "15px",
              width: "100%",
            }}>
            {damat}
          </Box>
          {/* Other boxes omitted for brevity */}
        </>
      );

    default:
      return (
        <Box>
          <Typography>No specific component for this ID</Typography>
        </Box>
      );
  }
};

export default ItemDetailComponent;
