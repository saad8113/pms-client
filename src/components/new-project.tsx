// import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import HttpService from "../services/http-services";
import { ToastContainer, toast } from "react-toastify";
// import ReactImagePickerEditor from "react-image-picker-editor";

function NewProject() {
  // const config2 = {
  //   borderRadius: "8px",
  //   language: "en",
  //   width: "100px",
  //   height: "100px",
  //   objectFit: "contain",
  //   compressInitial: null,
  // } as any;

  // const initialImage = "";

  // const uploadPhoto = async (base64String: any) => {
  //   const path = `${
  //     process.env.REACT_APP_API_URL.split("//")[1] || "no-server"
  //   }/images/${Date.now()}.jpg`;
  //   const storage = getStorage(firebaseApp);
  //   const file = await fetch(base64String).then((r) => r.blob());
  //   const storageRef = ref(storage, path);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       // Handle errors
  //     },
  //     async () => {
  //       const url = await getDownloadURL(storageRef);
  //       addImages(url);
  //     }
  //   );
  // };

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    image: "some url",
    tags: ["postgreSQL", "express", "react", "node"],
    gitHubRepoLink: "",
    liveUrl: "",
  });

  const createProject = async () => {
    try {
      const {
        data: { message },
      } = await HttpService.createProject(projectData);

      toast.success(message);

      setProjectData({
        name: "",
        description: "",
        startDate: "",
        image: "some url",
        tags: ["postgreSQL", "express", "react", "node"],
        gitHubRepoLink: "",
        liveUrl: "",
      });
    } catch (err: any) {
      if (err.status >= 400 && err.status < 500) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div style={{ alignItems: "center" }}>
      <h3>Create Project</h3>
      <ToastContainer />
      <Form>
        <Container fluid>
          <Row>
            <Col sm={8}>
              <Form.Group
                className="mt-3 mb-3"
                controlId="formBasicProjectName"
              >
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  value={projectData.name}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      name: e.target.value,
                    })
                  }
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  value={projectData.startDate}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      startDate: e.target.value,
                    })
                  }
                  type="date"
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicProjectName">
                <Form.Label>Tech Stack</Form.Label>
                <Form.Control onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    tags: e.target.value,
                  })
                } type="text" />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Github Repo Link</Form.Label>
                <Form.Control
                  value={projectData.gitHubRepoLink}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      gitHubRepoLink: e.target.value,
                    })
                  }
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicStartDate">
                <Form.Label>Live URL</Form.Label>
                <Form.Control
                  value={projectData.liveUrl}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      liveUrl: e.target.value,
                    })
                  }
                  type="text"
                />
              </Form.Group>
            </Col>

            <Col style={{ marginTop: 45 }} sm={4}>
              <Button onClick={createProject} variant="primary" type="button">
                Create
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}

export default NewProject;
