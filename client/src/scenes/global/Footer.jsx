import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import logo from "../../assets/logo/logo.png";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)">
        <Box width="clamp(20%, 30%, 40%)">
          <Box
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "48px",
            }}></Box>
          <div>
            Eşsiz davetlerinize zarif bir dokunuş katmak için davetiyelerinizin
            dijital halini tasarlıyoruz. Özel günlerinizi unutulmaz kılacak,
            tarzınıza uygun, modern ve şık davetiye tasarımlarıyla sizleri
            buluşturuyoruz. Sadece bir tıkla önizleme destekli davetiyelerinizi
            oluşturabilirsiniz. Düğün, nişan, doğum günü ve tüm kutlamalarınızda
            size özel tasarımlar için bizimle iletişime geçin. Davetlerinize
            değer katmak için buradayız!
          </div>
        </Box>

        <Box>
          <Typography variant="h3" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        {/* <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box> */}

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h3" fontWeight="bold" mb="30px">
            İletişim
          </Typography>
          <Typography mb="30px">
            Adres: Kayışdağı Mahallesi Akyazı Caddesi No: 34B Ataşehir /
            İstanbul
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: farukylcn@gmail.com
          </Typography>
          <Typography mb="30px">Telefon: 0 (534) 216 3446</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
