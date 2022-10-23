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

const QuestionsPage2: FunctionComponent = (): React.ReactElement => {
  const env: IDF_ENV = envConfig;

  const [dynamicHTML, setDynamicHTML] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // ----------------------------------------------------------------------------------------------------------------------------------------------------
  async function getFormData() {
    console.log(" Saving the new project to the back-end ");

    const url = env.env_builder.base_web_url + "questionaire2.json";
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

  const onKeyUpState = event => {
    setState(event.target.value);
    console.log(" Key pressed: " + event.target.value);
  };

  const onKeyUpCountry = event => {
    setCountry(event.target.value);
    console.log(" Key pressed: " + event.target.value);
  };

  useEffect(() => {
    console.log(" page has loaded ");

    const fetchData = async () => {
      const data = await createFormRender();

      const divId = document.querySelector("#my-inputs");
      const input = divId.querySelectorAll("input");

      if (input && input.length > 0) {
        input[0].addEventListener("keyup", onKeyUpState);
        input[1].addEventListener("keyup", onKeyUpCountry);
      }

      setDynamicHTML(data);
    };

    fetchData();
  });

  const doSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    alert(" from " + state + " " + country + " Thank you.  That's all. ");
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
                  <h3> Questionaire Page 2</h3>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div id="my-inputs" className="content" dangerouslySetInnerHTML={{ __html: dynamicHTML }}></div>

        <Button style={{ margin: "auto", padding: 10 }} onClick={doSave} variant="primary" type="submit">
          <img src={env.env_builder.base_web_url + "save.png"} width="25" alt="Save" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default QuestionsPage2;
