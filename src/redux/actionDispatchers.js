import axios from "axios";
import {fetchDataError, fetchDataRequest, fetchDataSuccess} from "./action";

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
