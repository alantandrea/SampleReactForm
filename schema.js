const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLInputObjectType, GraphQLID } = require("graphql");

const axios = require("axios");

const JSON_SERVER_ENDPOINT = `http://localhost:3000/projectData`;

const ProjectDataType = new GraphQLObjectType({
  name: "OlympicWinner",
  fields: () => ({
    id: { type: GraphQLID },
    project: { type: GraphQLString },
    description: { type: GraphQLString },
    startDate: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    expectedHours: { type: GraphQLInt },
    completedHours: { type: GraphQLInt },
    gold: { type: GraphQLInt },
    silver: { type: GraphQLInt },
    bronze: { type: GraphQLInt },
    total: { type: GraphQLInt }
  })
});

const OlympicWinnerInputType = new GraphQLInputObjectType({
  name: "OlympicWinnerInput",
  fields: () => ({
    id: { type: GraphQLID },
    project: { type: GraphQLString },
    description: { type: GraphQLString },
    country: { type: GraphQLString },
    year: { type: GraphQLInt },
    date: { type: GraphQLString },
    sport: { type: GraphQLString },
    gold: { type: GraphQLInt },
    silver: { type: GraphQLInt },
    bronze: { type: GraphQLInt },
    total: { type: GraphQLInt }
  })
});

const ResponseType = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    lastRow: { type: GraphQLInt },
    rows: { type: new GraphQLList(ProjectDataType) }
  })
});

const SortModelType = new GraphQLInputObjectType({
  name: "SortModel",
  fields: () => ({
    colId: { type: GraphQLString },
    sort: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getRows: {
      type: ResponseType,
      args: {
        // ** non-nulls are required **
        startRow: { type: GraphQLNonNull(GraphQLInt) },
        endRow: { type: GraphQLNonNull(GraphQLInt) },
        sortModel: { type: new GraphQLList(SortModelType) }
        // filterModel: {}
        // groupKeys: []
        // pivotCols: []
        // pivotMode: false
        // rowGroupCols: []
        // valueCols: []
      },
      resolve(parentValue, args) {
        let endPoint = JSON_SERVER_ENDPOINT;
        const isRequestSorting = args.sortModel && args.sortModel.length > 0;

        if (isRequestSorting) {
          const fields = [];
          const orders = [];
          args.sortModel.forEach(sM => {
            fields.push(sM.colId);
            orders.push(sM.sort);
          });
          // sorting
          endPoint += `?_sort=${fields.join(",")}&_order=${orders.join(",")}`;
          // starting from start row with a limit of endRow - startRows rows
          endPoint += `&_start=${args.startRow}&_limit=${args.endRow - args.startRow}`;
        } else {
          endPoint += `?_start=${args.startRow}&_end=${args.endRow}`;
        }

        return axios
          .get(endPoint)
          .then(res => {
            return {
              rows: res.data,
              lastRow: res.headers["x-total-count"]
            };
          })
          .catch(err => console.log(err));
      }
    },
    readRow: {
      type: ProjectDataType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, args) {
        return axios
          .get(JSON_SERVER_ENDPOINT + "/" + args.id)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createRow: {
      type: ProjectDataType,
      args: {
        data: { type: GraphQLNonNull(OlympicWinnerInputType) }
      },
      resolve(parentValue, args) {
        return axios
          .post(JSON_SERVER_ENDPOINT, args.data)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },
    updateRow: {
      type: ProjectDataType,
      args: {
        data: { type: GraphQLNonNull(OlympicWinnerInputType) }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`${JSON_SERVER_ENDPOINT}/${args.data.id}`, args.data)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },
    deleteRow: {
      type: ProjectDataType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, args) {
        return axios
          .delete(`${JSON_SERVER_ENDPOINT}/${args.id}`)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
