import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const DataTable = ({ columns, rows, getRowId = (row) => row.id }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 'bold' }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={getRowId(row)} hover>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.renderCell
                    ? column.renderCell(row)
                    : column.valueGetter
                    ? column.valueGetter(row)
                    : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

