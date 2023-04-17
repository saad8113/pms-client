import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import Navbar from "./common/navbar";
// import Sidebar from "./common/siderbar";
import Projects from "./projects";
import Archived from "./archived";
import Completed from "./completed";
import NewProject from "./new-project";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/", { replace: true });
  };

  const validateToken = () => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col sm={2}>
            <div
              style={{
                backgroundColor: "yellowgreen",
                height: "50vh",
                // alignItems: "center",
              }}
            >
              <div>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <Link to="/dashboard">Create Project</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/projects/all">Projects</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/projects/archived">Archived</Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/projects/completed
                "
                    >
                      Completed
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <Button variant="link" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </Col>
          <Col sm={1} />
          <Col
            style={{
              marginTop: "2%",
              marginBottom: "2%",
              backgroundColor: "yellow",
            }}
            sm={8}
          >
            {/* <Card
              style={{ alignItems: "center", width: "100%", height: "450px" }}
            > */}
            <Routes>
              <Route path="" element={<NewProject />} />
              <Route path="projects/all" element={<Projects />} />
              <Route path="projects/archived" element={<Archived />} />
              <Route path="projects/completed" element={<Completed />} />
            </Routes>
            {/* </Card> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
