import { Box, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { chains, currentChains } from 'services/WalletService/config';
import { Chains } from 'types';

export const ChainFilter = ({ sx, ...props }: TextFieldProps) => (
  <TextField select {...props} sx={{ width: '300px', ...sx }}>
    <MenuItem value="" sx={{ display: 'flex', alignItems: 'center' }}>
      <Box component="img" src={chains[Chains.eth].mainnet.img} sx={{ width: 20, height: 20 }} />
      <Box component="img" src={chains[Chains.bsc].mainnet.img} sx={{ width: 20, height: 20, marginLeft: -1 }} />
      <Box
        component="img"
        src={chains[Chains.pol].mainnet.img}
        sx={{ width: 20, height: 20, marginLeft: -1, marginRight: 1 }}
      />
      All chains
    </MenuItem>
    {currentChains.map((chain) => (
      <MenuItem key={chain.chainId} value={chain.id} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="img" src={chain.img} sx={{ width: 20, height: 20, marginRight: 1 }} />
        {chain.name}
      </MenuItem>
    ))}
  </TextField>
);
