import { Box, Table as MuiTable, TableBody, TableContainer, TableContainerProps, useTheme } from '@mui/material';

import { TableHead, TableRow } from './components';
import { ColumnData, RowData } from './Table.types';

export interface TableProps {
  columns: ColumnData[];
  rows: RowData[];
}

// Common table component with pagination, row indexing, sorting
export const Table = ({ columns, rows, ...tableContainerProps }: TableContainerProps & TableProps) => {
  const theme = useTheme();

  return (
    <Box>
      <TableContainer
        {...tableContainerProps}
        sx={{
          borderRadius: '24px',
          marginBottom: 3,
          backgroundColor: 'transparent',
          tr: {
            'td, th': {
              '&:first-of-type': {
                paddingLeft: 4,
              },
              '&:last-of-type': {
                paddingRight: 4,
              },
            },
          },
          ...tableContainerProps.sx,
        }}
      >
        <MuiTable
          sx={{
            borderCollapse: 'separate',
            borderSpacing: theme.spacing(0, 2),
          }}
        >
          <TableHead columns={columns} />
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={JSON.stringify(Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value.value])))}
                columns={columns}
                row={row}
              />
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};
