import { VFC } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';

export default {
  title: 'theme/Checkbox',
};

export const Default: VFC = () => (
  <>
    <Typography variant="h3">Checkbox</Typography>
    <FormControl style={{ padding: 20 }} component="fieldset">
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Active" />
      </FormGroup>
    </FormControl>
    <Checkbox />
  </>
);
