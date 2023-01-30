import { ReactNode } from 'react';

export interface ColumnData {
  id: string | number;
  title: ReactNode | ReactNode[];
  width?: string;
}

export interface RowData {
  [key: ColumnData['id']]: {
    value?: number | string;
    title: ReactNode | ReactNode[];
  };
}
