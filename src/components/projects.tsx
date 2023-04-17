import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import typeScriptLogo from "../assets/Typescript_logo_2020.svg.png";
import HttpService from "../services/http-services";
import { toast, ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { PROJECT_STATUS } from "../constants";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [focusedItemId, setFocusedItemId] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    tags: ["postgreSQL", "express", "react", "node"],
    gitHubRepoLink: "",
    liveUrl: "",
  });

  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowConfirmDialog = () => setShowConfirmDialog(true);
  const handleCloseConfirmDialog = () => setShowConfirmDialog(false);

  const getAllProjects = async () => {
    try {
      const {
        data: { data: projects },
      } = await HttpService.getProjects(PROJECT_STATUS.ACTIVE);

      setProjects(projects);
    } catch (err: any) {
      if (err.status >= 400 && err.status < 500) {
        toast.error(err.data.message);
      }
    }
  };

  const deleteProject = async () => {
    try {
      const {
        data: { message },
      } = await HttpService.deleteProject(focusedItemId);

      setProjects(projects.filter((p: any) => p.projectId !== focusedItemId));

      toast.success(message);
    } catch (err: any) {
      if (err.status >= 400 && err.status < 500) {
        toast.error(err.data.message);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <Container>
      <h3>Projects</h3>
      <ToastContainer />
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your project name..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Your project description..."
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Your project start date..."
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tech Stacks</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your project tech stacks..."
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Github Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your project github repo link..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Live Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="your project live url..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseUpdateModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmDialog} onHide={handleCloseConfirmDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You want to delete this project?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCloseConfirmDialog} variant="secondary">
            No
          </Button>
          <Button
            onClick={() => {
              deleteProject();
              handleCloseConfirmDialog();
            }}
            variant="primary"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row xs={1} md={3} className="g-4">
        {projects.map((p: any) => (
          <Col>
            <Card style={{ width: "15rem" }}>
              <Card.Img variant="top" src={typeScriptLogo} height={150} />
              <Card.Body>
                <Card.Title style={{ fontSize: 15 }}>{p.name}</Card.Title>
                <Card.Text>{p.description}</Card.Text>
                {/* <Card.Text>{p.tags}</Card.Text> */}
                <Card.Text>{p.gitHubRepoLink}</Card.Text>
                <Card.Text>{p.liveUrl}</Card.Text>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button variant="link" onClick={handleShowUpdateModal}>
                    Edit
                  </Button>

                  <Button
                    variant="link"
                    onClick={() => {
                      setFocusedItemId(p.projectId);
                      handleShowConfirmDialog();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
