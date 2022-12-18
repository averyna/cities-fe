import React, {useState} from "react";
import {useFilters, useTable} from "react-table";

export default function Table({ columns, data }) {

  //..........enable search START............//
  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };
  //.............END.............//

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter
  } = useTable({ columns, data }, useFilters);

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (<div>
        <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search by name"}
        />
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render(
                      "Header")}</th>
              ))}
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render(
                      "Cell")}</td>;
                })}
              </tr>
          );
        })}
        </tbody>
      </table>
      </div>
  );
}
