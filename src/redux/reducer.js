const initialState = {
  data: [],
  loading: false,
  error: {},
};
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default: return initialState;
  }
}
