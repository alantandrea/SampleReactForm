import { IServerSideDatasource } from "ag-grid-community";
import { Binary } from "@babel/types";

export interface IProjectData {
  activeInd: boolean;
  budget: number;
  companyId: string;
  desc: string;
  dueDate: string;
  id: string;
  name: string;
  projectManager: any;
  startDate: string;
  templateInd: boolean;
}

export interface IProjectBuilderData {
  projId: string;
  taskId: string;
  workItemId: string;
}

export interface ITasksData {
  id: string;
  projectId: string;
  name: string;
  desc: String;
  templateInd: boolean;
  assignedTo: string;
  startDate: string;
  dueDate: string;
  expectedHours: number;
  completedHours: number;
  linkTotrackingApp: string;

  phase: string;
  feature: string;
  linkInstructions: string;
}

export interface IWorkItemsData {
  id: string;
  taskId: string;
  name: string;
  desc: String;
  templateInd: Boolean;
  assignedTo: string;
  startDate: string;
  dueDate: string;
  expectedHours: number;
  completedHours: number;
  linkInstructions: string;

  category: string;
  sub_category: string;
  resource_type: string;
}

export interface ICopyProjectData {
  id: string;
  name: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IExcelUploadData {
  excelSheet: Binary;
}

export interface IDenormalizedProjectsData {
  id: string;
  project: string;
  task: string;
  workitem: string;
}

export interface IServerSideDatasourceWithCRUD extends IServerSideDatasource {
  createRow(data: IProjectData): Promise<any>;
  readRow(id: string): Promise<any>;
  updateRow(data: IProjectData): Promise<any>;
  deleteRow(id: string): Promise<any>;
}

export interface ITasksServerSideDatasourceWithCRUD extends IServerSideDatasource {
  createRow(data: ITasksData): Promise<any>;
  readRow(id: string): Promise<any>;
  updateRow(data: ITasksData): Promise<any>;
  deleteRow(id: string): Promise<any>;
  //swapRows(startRowIdx: Number, moveToRowidx: Number): Promise<any>;
}

export interface ITasksFilteredServerSideDatasourceWithCRUD extends IServerSideDatasource {
  createRow(data: ITasksData): Promise<any>;
  readRow(id: string): Promise<any>;
  updateRow(data: ITasksData): Promise<any>;
  deleteRow(id: string): Promise<any>;
}

export interface IWorkItemsServerSideDatasourceWithCRUD extends IServerSideDatasource {
  createRow(data: IWorkItemsData): Promise<any>;
  readRow(id: string): Promise<any>;
  updateRow(data: IWorkItemsData): Promise<any>;
  deleteRow(id: string): Promise<any>;
}

export interface IServerSideProjBuilderDatasourceWithCRUD extends IServerSideDatasource {
  createRow(data: IProjectData): Promise<any>;
  readRow(id: string): Promise<any>;
  updateRow(data: IProjectData): Promise<any>;
  deleteRow(id: string): Promise<any>;
}

export interface ICopyProjectsServerSideDatasourceWithCRUD extends IServerSideDatasource {
  copyRow(data: ICopyProjectData): Promise<any>;
}

export interface IFormSubmitHandler {
  (data: IProjectData): void;
}

export interface IFormSubmitHandlerDuplicateItem {}

export interface IFormSubmitHandlerTasks {
  (data: ITasksData): void;
}

export interface IFormSubmitHandlerWorkItems {
  (data: IWorkItemsData): void;
}

export interface IFormSubmitHandlerCopyProject {
  (data: ICopyProjectData): void;
}

export interface IProjectbuildermSubmitHandler {
  (data: ICopyProjectData): void;
}

export interface IFormSubmitHandlerLogin {
  (data: ILoginData): void;
}

export interface IFormSubmitHandlerExcelUpload {
  (data: IExcelUploadData): void;
}
