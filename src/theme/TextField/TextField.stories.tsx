import { Box, TextField } from '@mui/material';

export default {
  title: 'theme/TextField',
};

export const Default = () => (
  <Box sx={{ flexGrow: 1, p: 2 }}>
    <TextField placeholder="Search name" sx={{ width: 400 }} />
    <TextField error placeholder="Search name" sx={{ width: 400 }} />
    <TextField placeholder="Search name" className="success" sx={{ width: 400 }} />
    <TextField placeholder="Search name" disabled sx={{ width: 400 }} />
  </Box>
);
