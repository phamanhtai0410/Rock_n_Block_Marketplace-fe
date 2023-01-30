import { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { mockAva } from 'assets/images';
import { Avatar } from 'components';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { flexHelper, shortenPhrase } from 'utils';

export type CategoryInfoHeaderProps = {
  name?: string;
  avatar?: string | null;
  subName: string;
  isAbleToEdit?: boolean;
  buttonText?: string;
  onAddMore?: () => void;
};

export const CategoryInfoHeader: FC<CategoryInfoHeaderProps> = ({
  name,
  subName,
  buttonText,
  avatar,
  isAbleToEdit = false,
  onAddMore,
}) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ ...flexHelper('space-between', 'center') }} spacing={4}>
      <Stack spacing={2.75} direction={{ xs: 'column', sm: 'row' }}>
        <Avatar image={avatar || mockAva} size="xxl" />
        <Stack
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          justifyContent="center"
          sx={{ wordBreak: 'break-all', maxWidth: 500 }}
        >
          <Typography variant="h4" textAlign={{ xs: 'center', sm: 'start' }}>
            {name}
          </Typography>
          <Typography variant="body1" className="s" color={COLOR_PRIMARY_1}>
            {shortenPhrase(subName, 35, 3)}
          </Typography>
        </Stack>
      </Stack>
      {isAbleToEdit && buttonText && (
        <Box sx={{ alignSelf: { xs: 'center', sm: 'end' } }}>
          <Button onClick={onAddMore} sx={{ minWidth: '170px' }} size="small">
            {buttonText}
          </Button>
        </Box>
      )}
    </Stack>
  );
};
