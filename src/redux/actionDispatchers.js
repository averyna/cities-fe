import axios from "axios";
import {
  fetchDataError,
  fetchDataRequest,
  fetchDataSuccess
} from "./action";

export function fetchCities() {
  return dispatch => {
    dispatch(fetchDataRequest());
    axios.get(
        'http://localhost:8099/cities'
    )
    .then(response => {
      dispatch(fetchDataSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchDataError(error));
    });
  };
}

export function editCity(rowIndex, columnId, newValue, data) {
  let newRow = {};
  const newData = data.map((row, index) => {
            if (index === rowIndex) {
              newRow = {
                ...data[rowIndex],
                [columnId]: newValue,
              };
              return newRow;
            }
            return row;
          });
  return dispatch => {
    axios.put(`http://localhost:8099/cities/${newRow.id}`, newRow)
    .then(response => {
      if (response.data === true) {
        dispatch(fetchDataSuccess(newData));
      }
    })
    .catch(error => {
      dispatch(fetchDataError(error));
    });
  };
}
