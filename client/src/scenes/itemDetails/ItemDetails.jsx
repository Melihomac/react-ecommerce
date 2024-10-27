import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import ItemDetailComponent from "../../components/ItemDetailComponent";
import TextFieldComponent from "../../components/TextField";
import { addToCart } from "../../state";
import FutureDatePicker from "../../components/DatePicker";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import logo from "../../assets/logo/logo.png";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId, documentId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  // State for damat, gelin, metinYazi, etkinlikAdi
  const [damat, setDamat] = useState("Damat Adı");
  const [gelin, setGelin] = useState("Gelin Adı");
  const [etkinlikAdi, setEtkinlikAdi] = useState("DÜĞÜN");
  const [metinYazi, setMetinYazi] = useState("Evleniyoruz");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("");
  const [erkekTarafi, setErkekTarafi] = useState(
    "Anne isim - Baba isim, Soyad"
  );
  const [kizTarafi, setKizTarafi] = useState("Anne isim - Baba isim, Soyad");
  const [ekBilgi, setEkBilgi] = useState(
    "Ek Bilgi Örnek: Kına Adres ve saat bilgisi"
  );
  const [konum1, setKonum1] = useState("");
  const [konum2, setKonum2] = useState("");
  const [buton2Isim, setbuton2Isim] = useState("Buton ismi değiştir");
  const [isLocation, setIsLocation] = useState(false);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTurkishDayName = (date) => {
    const dayIndex = format(date, "i", { locale: tr });
    const days = [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
      "Pazar",
    ];
    return days[dayIndex - 1];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDay(getTurkishDayName(date));
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const timeRemaining = selectedDate - now;

      if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(calculateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [selectedDate]);

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${documentId}?populate=image`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderLongDescription = (longDescription) => {
    return longDescription.map((paragraph, index) => (
      <Typography key={index} sx={{ mt: "20px" }}>
        {paragraph.children.map((child, idx) => child.text)}
      </Typography>
    ));
  };

  const imageUrl =
    item && item.image && item.image[0]?.url
      ? `http://localhost:1337${item.image[0].url}`
      : "";

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let widthMobile = isMobile ? "375px" : "500px";
  let heightMobile = isMobile ? "900px" : "1200px";

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="0 0 40%" mb="40px">
          {imageUrl ? (
            <Box
              sx={{
                width: "100%",
                maxWidth: isMobile ? "375px" : "500px",
                aspectRatio: "16/9",
                position: "relative",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid black",
                height: isMobile ? "900px" : "1200px",
                overflow: "hidden",
                right: "15px",
              }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "500%",
                  height: "300%",
                  backgroundImage: `url(${logo})`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "800px 150px",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  opacity: 0.1, // Decrease opacity for a more subtle appearance
                  pointerEvents: "none", // Prevent interaction
                }}
              />
              <ItemDetailComponent
                damat={damat}
                gelin={gelin}
                etkinlikAdi={etkinlikAdi}
                metinYazi={metinYazi}
                tarih={format(selectedDate, "dd/MM/yyyy")}
                gun={selectedDay}
                documentId={documentId}
                endDate={`${countdown.days} Gün ${countdown.hours} Saat ${countdown.minutes} Dakika ${countdown.seconds} Saniye`}
                erkekTarafi={erkekTarafi}
                kizTarafi={kizTarafi}
                ekBilgi={ekBilgi}
                konum1={konum1}
                konum2={konum2}
                isLocation={isLocation}
                buton2Isim={buton2Isim}
              />
            </Box>
          ) : (
            <Typography>No Image Available</Typography>
          )}
        </Box>

        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography>{item?.price} TL</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.longDescription
                ? renderLongDescription(item.longDescription)
                : "No description available"}
            </Typography>
          </Box>

          <Box flex="1 1 50%" mb="40px">
            <TextFieldComponent
              label="Damat Adı"
              defaultValue=""
              onChange={(e) => setDamat(e.target.value)}
              uzunluk={12}
              fullWidth={false}
            />
            <TextFieldComponent
              label="Gelin Adı"
              defaultValue=""
              onChange={(e) => setGelin(e.target.value)}
              uzunluk={12}
              fullWidth={false}
            />
            <TextFieldComponent
              label="Etkinlik Adı"
              defaultValue=""
              onChange={(e) => setEtkinlikAdi(e.target.value)}
              uzunluk={12}
              fullWidth={true}
            />
            <TextFieldComponent
              label="Metin Yazı (Evleniyoruz)"
              defaultValue=""
              onChange={(e) => setMetinYazi(e.target.value)}
              uzunluk={12}
              fullWidth={true}
            />
            <FutureDatePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
              label={"Düğün Tarihi Seçiniz"}
            />
            <TextFieldComponent
              label="Kız Tarafı Aile ismi"
              defaultValue=""
              onChange={(e) => setKizTarafi(e.target.value)}
              uzunluk={40}
              fullWidth={false}
            />
            <TextFieldComponent
              label="Erkek Tarafı Aile ismi"
              defaultValue=""
              onChange={(e) => setErkekTarafi(e.target.value)}
              uzunluk={40}
              fullWidth={false}
            />
            <TextFieldComponent
              label="Ek Bilgi Giriniz"
              defaultValue=""
              onChange={(e) => setEkBilgi(e.target.value)}
              uzunluk={50}
              fullWidth={true}
            />
            <TextFieldComponent
              label="Konum bilgisi giriniz"
              defaultValue=""
              onChange={(e) => setKonum1(e.target.value)}
              uzunluk={300}
              fullWidth={true}
            />
            <FormControlLabel
              control={
                <Checkbox
                  inputProps={{ "aria-label": "checkbox" }}
                  onChange={() => {
                    setIsLocation((prev) => !prev);
                  }}
                />
              }
              sx={{ mb: "-20px", mt: "10px" }}
              label="2. Konum var ise seçiniz"
            />
            {isLocation === true ? (
              <Box sx={{ flexDirection: "row" }}>
                <TextFieldComponent
                  label="2. Konum bilgisi giriniz"
                  defaultValue=""
                  onChange={(e) => setKonum2(e.target.value)}
                  uzunluk={300}
                  fullWidth={false}
                />
                <TextFieldComponent
                  label="Buton ismi değiştir"
                  defaultValue=""
                  onChange={(e) => setbuton2Isim(e.target.value)}
                  uzunluk={20}
                  fullWidth={false}
                />
              </Box>
            ) : null}
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}>
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.category}</Typography>
          </Box>
        </Box>
        {/* INFORMATION */}
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Açıklama" value="description" />
            <Tab label="Yorumlar" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {item?.longDescription
            ? renderLongDescription(item.longDescription)
            : "No description available"}
          {value === "reviews" && <div>reviews</div>}
        </Box>

        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Benzer Ürünler
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="space-between">
            {items.slice(0, 4).map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
