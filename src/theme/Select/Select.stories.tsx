import { ChangeEvent, useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

export default {
  title: 'theme/Select',
};

export const Default = () => {
  const [value2, setValue2] = useState<number | undefined>(10);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* <Select sx={{ width: '300px' }}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
      <TextField select sx={{ width: '300px' }}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </TextField>
      <TextField
        select
        sx={{ width: '300px' }}
        label="Suck my dick"
        value={value2}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue2(+e.target.value)}
      >
        <MenuItem value={0}>
          <Box
            sx={{ width: '20px', height: '20px', border: '2px solid #8E87AF', borderRadius: '50%', marginRight: '8px' }}
          />
          All colors
        </MenuItem>
        <MenuItem value={1}>
          <Box
            sx={{ width: '20px', height: '20px', backgroundColor: 'black', borderRadius: '50%', marginRight: '8px' }}
          />
          Black
        </MenuItem>
        <MenuItem value={2}>
          <Box
            sx={{ width: '20px', height: '20px', backgroundColor: '#45B26B', borderRadius: '50%', marginRight: '8px' }}
          />
          Green
        </MenuItem>
        <MenuItem value={3}>
          <Box
            sx={{ width: '20px', height: '20px', backgroundColor: '#EF466F', borderRadius: '50%', marginRight: '8px' }}
          />
          Pink
        </MenuItem>
        <MenuItem value={4}>
          <Box
            sx={{ width: '20px', height: '20px', backgroundColor: '#9757D7', borderRadius: '50%', marginRight: '8px' }}
          />
          Purple
        </MenuItem>
      </TextField>
    </Box>
  );
};
