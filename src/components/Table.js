import React, {useEffect, useState} from "react";
import {useFilters, useTable, usePagination } from "react-table";

import "./table.css";

export default function Table({ columns, data }) {

  // enable search by name functionality
  const [filterInput, setFilterInput] = useState("");
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  // Create editable column
  const [dataRows, setData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);
  // Editable cell code
  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        })
    );
  };

  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
  }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      updateMyData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    // Check to make sure not all columns are editable
    if (id === "name") {
      return <input value={value} onChange={onChange} onBlur={onBlur} />;
    }
    return value;
  };

  const defaultColumn = {
    Cell: EditableCell,
  };


  useEffect(() => {
    setSkipPageReset(false);
    console.log(dataRows);
  }, [dataRows]);

 const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setFilter
  } = useTable(
      {
        columns,
        data,
        defaultColumn,
        autoResetPage: !skipPageReset,
        updateMyData,
      },
        useFilters,
        usePagination
 );

  const { pageIndex, pageSize } = state;

  return (<>
      <div id="search">
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Search city by the name ..."}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
          );
        })}
        </tbody>
      </table>
      <div id="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
