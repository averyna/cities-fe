import React from "react";
import {connect, useDispatch} from "react-redux";
import CityPhoto from "./CityPhoto.jsx";
import Table from "./Table.jsx";
import { fetchCities } from "../redux/actionDispatchers";

const TableContainer = props => {

  const {data, loading, error} = props.cityData;
  const dispatch = useDispatch();

  if (data.length === 0 && !loading) {
    dispatch(fetchCities());
  }

  const columns = [
        {
          Header: "City list",
          columns: [
            {
              Header: "Id",
              accessor: "id",
            },
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Photo",
              accessor: "photoUrl",
              Cell: ({ cell: { value } }) => <CityPhoto value={value} />
            }
          ]
        }
      ];
  return (<Table columns={columns} dispatch />);
}

const mapStateToProps = state => ({
  cityData: state.fetchCitiesReducer,
});

export default connect(mapStateToProps)(TableContainer);
