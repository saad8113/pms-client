import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";

import HttpService from "../services/http-services";

const Register = () => {
  const navigate = useNavigate();
  
  const [registrationData, setRegistrationData]: any = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const register = async () => {
    try {
      const {
        data: {
          message,
          data: { token, user },
        },
      } = await HttpService.registerUser(registrationData);

      toast.success(message);

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      setTimeout(() => {
        navigate("../dashboard", { replace: true });
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
      <Row style={{ marginTop: "8%", marginBottom: 50 }}>
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
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  })
                }
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  })
                }
                type="password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    firstName: e.target.value,
                  })
                }
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    lastName: e.target.value,
                  })
                }
                type="text"
              />
            </Form.Group>

            <Button onClick={register} variant="primary" type="button">
              Register
            </Button>
          </Form>
        </Col>
        <Col sm={4} />
      </Row>
    </Container>
  );
};

export default Register;
