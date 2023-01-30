import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Copy } from 'components/Icon/components';

export default {
  title: 'theme/Button',
};

export const Default: React.FC = () => (
  <Box padding={4}>
    <Typography>Outlined</Typography>
    <Box>
      <Button variant="outlined" size="small">
        Button Sm
      </Button>
      <Button variant="outlined" size="medium">
        Button Md
      </Button>
      <Button variant="outlined" size="medium" startIcon={<Copy />}>
        Button With icon
      </Button>
    </Box>
    <Typography>Contained</Typography>
    <Box>
      <Button variant="contained" size="small" disabled>
        Button Sm
      </Button>
      <Button variant="contained" size="small">
        Button Sm
      </Button>
      <Button variant="contained" size="medium">
        Button Md
      </Button>
      <Button variant="contained" endIcon={<Copy />}>
        Button With icon
      </Button>
    </Box>
    <Typography>Contained secondary</Typography>
    <Box>
      <Button variant="outlined" color="secondary" size="small" disabled>
        Button Sm
      </Button>
      <Button variant="outlined" color="secondary" size="small">
        Button Sm
      </Button>
      <Button variant="outlined" color="secondary" size="medium">
        Button Md
      </Button>
      <Button variant="outlined" color="secondary" endIcon={<Copy />}>
        Button With icon
      </Button>
      <Button variant="contained" color="secondary">
        Explore
      </Button>
    </Box>
  </Box>
);
