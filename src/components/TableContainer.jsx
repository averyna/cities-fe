import React, {useEffect, useState} from "react";
import axios from "axios";
import CityPhoto from "./CityPhoto";
import Table from "./Table";

const TableContainer = () => {
  // ........... to get data from BE START.................//
  const [cities, setCities] = useState([]);
  const fetchCities = () => {
    axios.get('http://localhost:8099/cities').then(res => {
      console.log(res);
      setCities(res.data);
    });
  }

  useEffect(() => {
    fetchCities();
  }, []);

  // ........... to get data from BE END.................//

  /*
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */

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
  return (<Table columns={columns} data={cities}/>);
}

export default TableContainer;
