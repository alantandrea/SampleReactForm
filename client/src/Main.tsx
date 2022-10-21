import React, { FunctionComponent, useState } from "react";
import * as Reacts from "react";
import { AgGridReact } from "ag-grid-react";
import { NavigationContainer } from "@react-navigation/native";
//import SafeAreaView from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { StackNavigationProp } from "@react-navigation/stack";
import { GridApi, ColumnApi, GridReadyEvent, RowNode } from "ag-grid-community";
import { ColDef, SideBarDef, ColumnVisibleEvent, SortChangedEvent, ColGroupDef } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

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
      </div>
    </div>
  );
};

export default NotFound;
