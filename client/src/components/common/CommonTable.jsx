import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

const CommonTable = ({ data, headers, handleUpdate, handleDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
    setPage(Math.min(maxPage, Math.max(0, newPage)));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            {headers.map((header) => (
              <TableCell key={header.key}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
              {headers.map((header) => (
                <TableCell key={header.key}>
                  {item[header.key]}
                  {header.key === 'update' && (
                    <Button onClick={() => handleUpdate(item.id)} variant="outlined" size="small">Update</Button>
                  )}
                  {header.key === 'delete' && (
                    <Button onClick={() => handleDelete(item.id)} variant="contained" size="small" color="error">Delete</Button>
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CommonTable;