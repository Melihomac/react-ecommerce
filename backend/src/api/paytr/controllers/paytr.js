"use strict";

const crypto = require("crypto");
const microtime = require("microtime");
const axios = require("axios");
const nodeBase64 = require("nodejs-base64-converter");

module.exports = {
  exampleAction: async (ctx, next) => {
    const responseItem = await fetch("http://localhost:1337/api/informations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // ["Sample Product 1", "18.00", 1],
    const jsonResponsed = await responseItem.json();
    const lastEntry = jsonResponsed.data[jsonResponsed.data.length - 1];
    const price = (lastEntry.price * 100).toString();
    const userBasket = lastEntry.user_basket;
    const userEmail = lastEntry.email.toString();
    const userAddress = lastEntry.user_address.toString();
    const userPhone = lastEntry.user_phone.toString();
    const userName = lastEntry.billName.toString();
    try {
      const merchant_id = "407808";
      const merchant_key = "nFB9Une47ffYm85T";
      const merchant_salt = "RP2UrK5xmCx2sq4w";
      const basket = userBasket;
      const user_basket = nodeBase64.encode(basket);
      const merchant_oid = "IN" + microtime.now();
      const user_ip = ctx.request.ip || "";
      const payment_amount = price;
      const email = userEmail;
      const no_installment = "0";
      const max_installment = "0";
      const currency = "TL";
      const test_mode = "1";
      const user_address = userAddress;
      const user_phone = userPhone;
      const user_name = userName;
      const lang = "tr";
      const non_3d = "1";
      const merchant_fail_url = "http://localhost:3000/checkout/success";
      const merchant_ok_url = "http://localhost:3000/checkout/success";
      const timeout_limit = "30";
      const debug_on = "1";
      const payment_type = "card";
      const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;
      const paytrToken = hashSTR + merchant_salt;
      const token = crypto
        .createHmac("sha256", merchant_key)
        .update(paytrToken)
        .digest("base64");

      const options = {
        method: "POST",
        url: "https://www.paytr.com/odeme/api/get-token",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams({
          merchant_id: merchant_id,
          merchant_key: merchant_key,
          merchant_salt: merchant_salt,
          email: email,
          payment_amount: payment_amount,
          merchant_oid: merchant_oid,
          user_name: user_name,
          user_address: user_address,
          user_phone: user_phone,
          merchant_ok_url: merchant_ok_url,
          merchant_fail_url: merchant_fail_url,
          user_basket: user_basket,
          user_ip: user_ip,
          timeout_limit: timeout_limit,
          debug_on: debug_on,
          test_mode: test_mode,
          lang: lang,
          no_installment: no_installment,
          max_installment: max_installment,
          currency: currency,
          paytr_token: token,
        }),
      };

      const response = await axios(options);
      const res_data = response.data;
      if (res_data.status == "success") {
        // await axios.post("http://localhost:1337/api/paytr/callback", {
        //   status: res_data.status,
        // });
        ctx.body = { iframetoken: res_data.token };
      } else {
        ctx.body = {
          error: res_data.reason,
        };
        //ctx.body = { token };
      }
    } catch (error) {
      console.error("Error in payment request:", error);
      ctx.body = { error: "An error occurred while processing the payment." };
    }
  },

  callbackAction: async (ctx, next) => {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:1337/api/pay/callback",
    //       {
    //         merchant_oid: merchantOid,
    //       }
    //     );
    //     if (response.data && response.data.status === "success") {
    //       // Update localStorage if payment was successful
    //       alert("Payment was successful!");
    //     } else {
    //       alert("Payment failed or hash validation failed.");
    //     }
    //   } catch (error) {
    //     console.error("Error checking payment status:", error);
    //   }
    // },
  },
};
