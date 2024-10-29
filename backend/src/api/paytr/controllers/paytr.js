"use strict";

/**
 * A set of functions called "actions" for `paytr`
 */

const crypto = require("crypto");
const microtime = require("microtime");

module.exports = {
  // Ödeme bilgilerini göstermek için örnek bir eylem
  exampleAction: async (ctx, next) => {
    try {
      // Değişkenler ve ödeme bilgileri
      const merchant_id = "407808";
      const merchant_key = "nFB9Une47ffYm85T";
      const merchant_salt = "RP2UrK5xmCx2sq4w";
      const basket = JSON.stringify([
        ["Örnek Ürün 1", "50.00", 1],
        ["Örnek Ürün 2", "33.25", 2],
        ["Örnek Ürün 3", "45.42", 1],
      ]);
      const user_basket = basket;
      const merchant_oid = "IN" + microtime.now();
      const user_ip = ctx.request.ip || "";
      const email = "testnon3d@paytr.com";
      const payment_amount = "100.99";
      const currency = "TL";
      const test_mode = "1";
      const user_name = "PayTR Test";
      const user_address = "test test test";
      const user_phone = "05555555555";
      const merchant_ok_url = "http://localhost:3000/checkout/success";
      const merchant_fail_url = "http://www.siteniz.com/odeme_hata.php";
      const debug_on = 1;
      const client_lang = "tr";
      const payment_type = "card";
      const non_3d = "0";
      const card_type = "";
      const installment_count = "0";
      const non3d_test_failed = "0";

      // Hash oluşturma
      const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${payment_type}${installment_count}${currency}${test_mode}${non_3d}`;
      const paytr_token = hashSTR + merchant_salt;
      const token = crypto
        .createHmac("sha256", merchant_key)
        .update(paytr_token)
        .digest("base64");

      // Yanıt içeriğini ayarlama
      ctx.body = {
        merchant_id,
        user_ip,
        merchant_oid,
        email,
        payment_type,
        payment_amount,
        currency,
        test_mode,
        non_3d,
        merchant_ok_url,
        merchant_fail_url,
        user_name,
        user_address,
        user_phone,
        user_basket,
        debug_on,
        client_lang,
        token,
        non3d_test_failed,
        installment_count,
        card_type,
      };
    } catch (err) {
      ctx.body = { error: err.message };
    }
  },

  callbackAction: async (ctx) => {
    try {
      const { merchant_oid, status, total_amount, hash } = ctx.request.body;
      const merchant_key = "nFB9Une47ffYm85T";
      const merchant_salt = "RP2UrK5xmCx2sq4w";
      const paytr_token = merchant_oid + merchant_salt + status + total_amount;
      const token = crypto
        .createHmac("sha256", merchant_key)
        .update(paytr_token)
        .digest("base64");

      // Token doğrulaması
      if (token !== hash) {
        ctx.throw(400, "PAYTR notification failed: bad hash");
      }

      if (status === "200") {
        ctx.body = "Hello";
      } else {
        // Başarısız işlem sonrası işlemler
      }

      ctx.body = "OK";
    } catch (err) {
      ctx.body = { error: err.message };
    }
  },
};
