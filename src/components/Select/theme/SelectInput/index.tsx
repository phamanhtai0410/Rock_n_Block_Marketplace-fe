import { InputBase, styled } from '@mui/material';

export const SelectInput = styled(InputBase)(({ theme }) => ({
  'label + &': {},
  '& .MuiInputBase-input': {
    position: 'relative',
    padding: theme.spacing(1, 0),
    width: '176px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid',
    borderColor: 'transparent',
    fontSize: '16px',
    transition: theme.transitions.create(['border-color']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus, &:hover': {
      background: 'transparent',
    },
  },
  '& .MuiSvgIcon-root': {
    margin: theme.spacing(1, 0, 0, 2),
  },
}));
