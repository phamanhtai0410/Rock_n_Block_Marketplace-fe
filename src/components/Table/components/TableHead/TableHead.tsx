import { TableCell, TableHead as MuiTableHead, TableRow, useTheme } from '@mui/material';
import { FontWeights } from 'theme/Typography';

import { ColumnData } from '../../Table.types';

interface TableHeadProps {
  columns: ColumnData[];
}

export const TableHead = ({ columns }: TableHeadProps) => {
  const theme = useTheme();
  return (
    <MuiTableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="left"
            sx={{
              width: column.width,
              fontSize: '12px',
              fontWeight: FontWeights.fontWeightBold,
              color: theme.themeColors.colorFooterText,
              lineHeight: '1rem',
              borderColor: theme.themeColors.colorDivider,
              textTransform: 'uppercase',
            }}
          >
            {column.title}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};
