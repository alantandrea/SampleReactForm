import React, { FunctionComponent, useState } from "react";

const NotFound: FunctionComponent = (): React.ReactElement => {
  return (
    <div className="container my-4">
      <div className="card my-3">
        <div className="card-header">
          <img src={require("./assets/projectBuilder.png")} alt="ag-Grid Logo" />
        </div>
        <div className="card-body">
          <div id="currViewTitle" className="card-body"></div>
        </div>
        <div id="currView">Page Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;
