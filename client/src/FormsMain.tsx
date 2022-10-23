import React, { FunctionComponent, useState, useEffect } from "react";
import * as envConfig from "./envConfig.json";
import { IDF_ENV } from "./env";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import "./App.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const IDFMain: FunctionComponent = (): React.ReactElement => {
  const env: IDF_ENV = envConfig;

  const [dynamicHTML, setDynamicHTML] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  // ----------------------------------------------------------------------------------------------------------------------------------------------------
  async function getFormData() {
    console.log(" Saving the new project to the back-end ");

    const url = env.env_builder.base_web_url + "formBuilder.json";
    let JSONResult = "";

    try {
      await axios({
        url: url,
        method: "get",
        headers: {
          "content-type": "application/json"
        }
      }).then(response => {
        let json = JSON.stringify(response.data);
        JSONResult = JSON.parse(json);

        console.log(" JSON loaded: " + json);
      });
    } catch (error) {}
    return JSONResult;
  }

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------

  async function createFormRender() {
    try {
      const formData: any = await getFormData();
      let formHTML = "";

      // Create the Form:

      for (let idx = 0; idx < formData.form_fields.length; ++idx) {
        switch (formData.form_fields[idx].type) {
          case "text_field": {
            formHTML += formData.form_fields[idx].label + '<input type=text ref="' + formData.form_fields[idx].id + '" name="' + formData.form_fields[idx].form_name + '">' + "<br>&nbsp;</br>";
            break;
          }
        }
      }

      return formHTML;
    } catch (err) {
      console.log("Error retrieving JSON form data.    Error: " + err);
      return "";
    }
  }

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------

  const onKeyUpFirstName = event => {
    setFirstName(event.target.value);
    console.log(" Key pressed: " + event.target.value);
  };

  const onKeyUpLastName = event => {
    setLastName(event.target.value);
    console.log(" Key pressed: " + event.target.value);
  };

  useEffect(() => {
    console.log(" page has loaded ");

    const fetchData = async () => {
      const data = await createFormRender();

      const divId = document.querySelector("#my-inputs");
      const input = divId.querySelectorAll("input");

      if (input && input.length > 0) {
        input[0].addEventListener("keyup", onKeyUpFirstName);
        input[1].addEventListener("keyup", onKeyUpLastName);
      }

      setDynamicHTML(data);
    };

    fetchData();
  });

  const doSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    alert(" Hello " + firstName + " " + lastName + " I am now going to the next step.... ");
    window.location.href = "/QuestionsPage2";
  };

  return (
    <div className="container my-4">
      <div className="card my-3">
        <div className="card-header">
          <div>
            <table width="100%">
              <tr>
                <td>
                  <img src={env.env_builder.base_web_url + "cogniticon.jpg"} />
                </td>
                <td>
                  <h3> Questionaire page 1</h3>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div id="my-inputs" className="content" dangerouslySetInnerHTML={{ __html: dynamicHTML }}></div>

        <Button style={{ margin: "auto", padding: 10 }} onClick={doSave} variant="primary" type="submit">
          <img src={env.env_builder.base_web_url + "save.png"} width="25" alt="Next" />
          Next
        </Button>
      </div>
    </div>
  );
};

export default IDFMain;
