import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import HttpService from "../services/http-services";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData]: any = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const {
        data: {
          message,
          data: { token, user },
        },
      } = await HttpService.loginUser(loginData);

      toast.success(message);
      
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (err: any) {
      if (err.status >= 400 && err.status < 500) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row style={{ marginTop: "15%", marginBottom: 50 }}>
        <Col sm={4} />
        <Col sm={4}>
          <h4>Project Management System</h4>
        </Col>
        <Col sm={4} />
      </Row>
      <Row>
        <Col sm={4} />
        <Col sm={4}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                type="password"
                placeholder="Password"
              />

              <Form.Text className="text-muted">
                Don't have an account? <Link to="/register">Create</Link>
              </Form.Text>
            </Form.Group>

            <Button onClick={login} variant="primary" type="button">
              Login
            </Button>
          </Form>
        </Col>
        <Col sm={4} />
      </Row>
    </Container>
  );
};

export default Login;
