import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hook/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import FormItem from "antd/es/form/FormItem";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const SignUp = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);

    const formData = { ...values, phoneNumber: value };

    console.log(formData);

    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);

        message.success(`Welcome to Social Cards ${data.user.username}!`);
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="Üye Ol">
            {error ? (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError("")}
              />
            ) : null}
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off">
              <Form.Item
                label="Kullanıcı Adı"
                name="username"
                rules={[
                  {
                    required: true,
                    type: "string",
                  },
                ]}>
                <Input placeholder="Kullanıcı adı giriniz" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}>
                <Input placeholder="Email giriniz" />
              </Form.Item>

              <Form.Item
                label="Şifre"
                name="password"
                rules={[{ required: true }]}>
                <Input.Password placeholder="Şirenizi giriniz" />
              </Form.Item>

              <FormItem
                label="Telefon Numarası"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid phone number",
                  },
                ]}>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  onChange={setValue}
                />
              </FormItem>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn">
                  Üye Ol {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              Hesabınız var mı? <Link to="/signin">Giriş Yap</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
