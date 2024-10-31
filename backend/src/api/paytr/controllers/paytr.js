"use strict";

const crypto = require("crypto");
const microtime = require("microtime");
const axios = require("axios");
const nodeBase64 = require("nodejs-base64-converter");

module.exports = {
  exampleAction: async (ctx, next) => {
    const options = {
      method: "GET",
      url: "http://localhost:1337/api/informations",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const responseInfo = await axios(options);
    try {
      const merchant_id = "407808";
      const merchant_key = "nFB9Une47ffYm85T";
      const merchant_salt = "RP2UrK5xmCx2sq4w";
      const basket = JSON.stringify([
        ["Sample Product 1", "18.00", 1],
        ["Sample Product 2", "33.25", 2],
        ["Sample Product 3", "45.42", 1],
      ]);
      const user_basket = nodeBase64.encode(basket);
      const merchant_oid = "IN" + microtime.now();
      const user_ip = ctx.request.ip || "";
      const payment_amount = "100";
      const email = "melihomac@hotmail.com";
      const no_installment = "0";
      const max_installment = "0";
      const currency = "TL";
      const test_mode = "1";
      const user_address = "test test test";
      const user_phone = "05555555555";
      const user_name = "paytr Test";
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
    try {
      const { merchant_oid, status, total_amount } = ctx.request.body;
      const merchant_key = "nFB9Une47ffYm85T";
      const merchant_salt = "RP2UrK5xmCx2sq4w";

      // Validate hash from PayTR response
      const paytr_token = `${merchant_oid}${merchant_salt}${status}${total_amount}`;
      const expected_hash = crypto
        .createHmac("sha256", merchant_key)
        .update(paytr_token)
        .digest("base64");

      if (ctx.request.body.hash !== expected_hash) {
        return (ctx.body = { error: "Hash validation failed." });
      }

      // Process the payment status
      if (status === "success") {
        console.log("Payment successful for merchant_oid:", merchant_oid);
        ctx.body = "OK";
      } else {
        console.log("Payment failed for merchant_oid:", merchant_oid);
        ctx.body = { error: "Payment failed" };
      }
    } catch (err) {
      console.error("Callback processing error:", err);
      ctx.body = { error: "An error occurred during the callback." };
    }
  },
};
