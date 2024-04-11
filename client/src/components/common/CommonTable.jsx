import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";

const CommonTable = ({
  data,
  headers,
  handleUpdate,
  handleDelete,
  handleAccept,
  handleReject,
  handleDispatch,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState(); 
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
    setPage(Math.min(maxPage, Math.max(0, newPage)));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const sortableColumnKeys = headers.filter((header) => !header.disableSorting).map((header) => header.key);
    if (sortableColumnKeys.includes(property)) {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) => value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <TableContainer component={Paper}>
      <TextField
        style={{ margin: "20px 0" }}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearch}
      />
      {filteredData.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                {headers.map((header) => (
                  <TableCell key={header.key}>
                    {header.disableSorting ? (
                      header.label 
                    ) : (
                      <TableSortLabel
                        active={orderBy === header.key}
                        direction={orderBy === header.key ? order : "asc"}
                        onClick={() => handleRequestSort(header.key)}
                      >
                        {header.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? sortedData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedData
              ).map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  {headers.map((header) => (
                    <TableCell key={header.key}>
                      {item[header.key]}
                      {header.key === "update" && (
                        <Button
                          onClick={() => handleUpdate(item.id)}
                          variant="outlined"
                          color="success"
                          size="small"
                        >
                          Update
                        </Button>
                      )}
                      {header.key === "delete" && (
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="contained"
                          size="small"
                          color="error"
                        >
                          Delete
                        </Button>
                      )}
                      {header.key === "dispatched_button" && (
                        <Button
                          onClick={() => handleDispatch(item.id)}
                          variant="contained"
                          size="small"
                          color="success"
                          disabled={
                            item.status !== "Accepted" ||
                            item.dispatched === "Dispatched"
                          }
                        >
                          Dispatch
                        </Button>
                      )}
                      {header.key === "accept" && (
                        <Button
                          onClick={() => handleAccept(item.id)}
                          variant="contained"
                          size="small"
                          color="success"
                          disabled={
                            item.status === "Accepted" ||
                            item.dispatched === "Dispatched"
                          }
                        >
                          Accept
                        </Button>
                      )}
                      {header.key === "reject" && (
                        <Button
                          onClick={() => handleReject(item.id)}
                          variant="contained"
                          size="small"
                          color="error"
                          disabled={
                            item.status === "Rejected" ||
                            item.dispatched === "Dispatched"
                          }
                        >
                          Reject
                        </Button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant="h6" align="center" style={{ margin: "20px 0" }}>
          No results found
        </Typography>
      )}
    </TableContainer>
  );
};

export default CommonTable;
