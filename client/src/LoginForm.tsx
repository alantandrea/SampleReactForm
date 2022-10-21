import React, { useState } from "react";
import { ILoginData, IFormSubmitHandlerLogin } from "./interfaces";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GridApi, ColumnApi, GridReadyEvent, RowNode } from "ag-grid-community";
import { v4 as uuid } from "uuid";

interface LoginFormProps {
  data: ILoginData;
  submit: IFormSubmitHandlerLogin;
  hide: () => void;
}

const LoginForm = (props: LoginFormProps): React.ReactElement => {
  const [show, setShow] = useState<Boolean>(true);

  const handleClose = () => {
    setShow(false);
    props.hide();
  };

  // const handleShow = () => setShow(true);

  let username: string;
  let password: any;

  if (props.data) {
    ({ username, password } = props.data);
  } else {
    username = "";
    password = "";
  }

  const [userNameForm, setUserNameForm] = useState<string>(username);
  const [passWordForm, setPassWordForm] = useState<string>(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ILoginData = {
      username: userNameForm,
      password: passWordForm
    };
    console.log(" Checking login credentials for: " + data.username + "  and " + data.password);

    if (data.username == "testuser" && data.password == "idf") {
      localStorage.setItem("logged_in", "true");
    } else alert("Please enter valid credentials");

    handleClose();
    setTimeout(() => {
      window.location.reload(false);
    }, 800);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                User Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter username..." required value={userNameForm} onChange={e => setUserNameForm(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Enter password..." required value={passWordForm} onChange={e => setPassWordForm(e.target.value)} />
              </Col>
            </Form.Group>

            <Button style={{ display: "block", margin: "auto" }} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer> */}

        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default LoginForm;
