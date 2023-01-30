import { TableCell, TableRow as MuiTableRow, useTheme } from '@mui/material';
import { FontWeights } from 'theme/Typography';

import { ColumnData, RowData } from '../../Table.types';

interface RowProps {
  columns: ColumnData[];
  row: RowData;
}

export const TableRow = ({ columns, row }: RowProps) => {
  const theme = useTheme();
  return (
    <MuiTableRow className="no-border" sx={{ marginBottom: 1, '&:last-of-type': { td: { border: 'none' } } }}>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align="left"
          sx={{
            width: column.width,
            fontSize: '16px',
            fontWeight: FontWeights.fontWeightMedium,
            color: theme.themeColors.colorTableText,
            borderColor: 'transparent',
            paddingY: '24px',
            backgroundColor: theme.themeColors.colorModalBackground,
            '&:first-of-type': { borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' },
            '&:last-of-type': { borderTopRightRadius: '16px', borderBottomRightRadius: '16px' },
          }}
        >
          {row?.[column.id]?.title}
        </TableCell>
      ))}
    </MuiTableRow>
  );
};
