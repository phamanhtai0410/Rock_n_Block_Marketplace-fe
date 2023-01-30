import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export interface PropertyHistoryCardProps {
  propertyName: string;
  propertyType: string;
}

export const PropertyHistoryCard: FC<PropertyHistoryCardProps> = ({ propertyName, propertyType }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        sx={{ textTransform: 'capitalize', lineHeight: '24px !important', fontWeight: 600 }}
        className="xs"
        color={theme.themeColors.colorTextBody2}
      >
        Type
      </Typography>
      <Typography sx={{ textTransform: 'capitalize', lineHeight: '24px !important' }} className="s">
        {propertyType}
      </Typography>
      <Typography
        sx={{ textTransform: 'capitalize', lineHeight: '24px !important', fontWeight: 600 }}
        className="xs"
        color={theme.themeColors.colorTextBody2}
      >
        Name
      </Typography>
      <Typography sx={{ textTransform: 'capitalize', lineHeight: '24px !important' }} className="s">
        {propertyName}
      </Typography>
    </Box>
  );
};
