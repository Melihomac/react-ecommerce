import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [iframeToken, setIframeToken] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isThirdStep = activeStep === 2;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      setActiveStep(2);
    }

    actions.setTouched({});
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/paytr", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse.iframetoken);
        setIframeToken(jsonResponse.iframetoken);
      } catch (error) {
        console.error("Error fetching iframetoken:", error);
      }
    };

    fetchToken();
  }, []);

  // async function getUserIp() {
  //   try {
  //     const response = await fetch("https://api64.ipify.org?format=json");
  //     const data = await response.json();
  //     return data.ip;
  //   } catch (error) {
  //     console.error("Error fetching IP address:", error);
  //   }
  // }

  // // Example usage:
  // getUserIp().then((ip) => console.log("User IP Address:", ip));

  // async function makePayment(values) {
  //   try {
  //     //const userIp = await getUserIp(); // Get the user's IP address

  //     // Prepare data for payment initiation
  //     const response = await fetch("http://localhost:1337/api/paytr", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         data: {
  //           payment_amount: calculateTotal(cart).toString(),
  //           user_name: values.firstName,
  //           user_ip: "",
  //           user_basket: "",
  //           user_address: values.shippingAddress.city,
  //           user_phone: values.phoneNumber,
  //           // email: values.email,
  //           // phoneNumber: values.phoneNumber,
  //           // userIp: userIp, // Automatically set user IP here
  //         },
  //       }),
  //     });

  //     const jsonResponse = await response.json();
  //     console.log("Server Response:", jsonResponse);
  //     const { token, error } = jsonResponse;
  //     console.log(token);
  //     if (token) {
  //       const iframeUrl = `https://www.paytr.com/odeme/guvenli/${token}`;
  //       window.location.href = iframeUrl;
  //     } else {
  //       console.error("Error starting payment:", error || "No token received");
  //     }
  //   } catch (err) {
  //     console.error("Error initiating payment:", err);
  //   }
  // }

  // async function fetchAndSendPaymentData() {
  //   try {
  //     const response = await fetch("http://localhost:1337/api/paytr");
  //     const responseText = await response.text();
  //     console.log("API Yanıtı:", responseText);

  //     if (!response.ok) {
  //       throw new Error(`HTTP hatası! Durum: ${response.status}`);
  //     }

  //     const data = JSON.parse(responseText);
  //     console.log("JSON Verisi:", data);

  //     const paymentData = {
  //       merchant_id: data.merchant_id,
  //       user_ip: data.user_ip,
  //       merchant_oid: data.merchant_oid,
  //       email: data.email,
  //       payment_type: "card",
  //       payment_amount: data.payment_amount,
  //       currency: data.currency,
  //       test_mode: "1",
  //       non_3d: "0",
  //       merchant_ok_url: data.merchant_ok_url,
  //       merchant_fail_url: data.merchant_fail_url,
  //       user_name: data.user_name,
  //       user_address: data.user_address,
  //       user_phone: data.user_phone,
  //       user_basket: JSON.stringify(data.user_basket),
  //       debug_on: data.debug_on,
  //       client_lang: data.client_lang,
  //       paytr_token: data.token,
  //       non3d_test_failed: data.non3d_test_failed,
  //       installment_count: "0",
  //       card_type: "",
  //     };

  //     const formData = new FormData();
  //     Object.keys(paymentData).forEach((key) =>
  //       formData.append(key, paymentData[key])
  //     );

  //     const paytrResponse = await fetch("https://www.paytr.com/odeme", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         origin: ["https://www.paytr.com"],
  //         allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  //       },
  //     });

  //     const paytrResponseText = await paytrResponse.text();
  //     console.log("PayTR Yanıtı:", paytrResponseText);

  //     if (response.token) {
  //       window.location.href = `https://www.paytr.com/odeme/guvenli/${response.data.token}`;
  //     } else {
  //       console.error("Ödeme işlemi başarısız:", paytrResponseText);
  //     }
  //   } catch (error) {
  //     console.error("İstek gönderme hatası:", error);
  //   }
  // }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isThirdStep && (
                <Box sx={{ width: "100%", height: "1000px" }}>
                  <script src="https://www.paytr.com/js/iframeResizer.min.js"></script>
                  <iframe
                    src={`https://www.paytr.com/odeme/guvenli/${iframeToken}`}
                    id="paytriframe"
                    frameBorder="0"
                    scrolling="no"
                    style={{ width: "100%" }}></iframe>
                  <script>iFrameResize({}, '#paytriframe');</script>
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}>
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}>
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
