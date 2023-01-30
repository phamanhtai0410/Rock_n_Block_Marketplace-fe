import { useEffect, useState } from 'react';
import { Box, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useShallowSelector } from 'hooks';
import { currentChains } from 'services/WalletService/config';
import userSelector from 'store/user/selectors';
import { Chains } from 'types';

export const ChainSelect = ({ onChange, ...props }: TextFieldProps) => {
  const { network } = useShallowSelector(userSelector.getUser);

  const [selectedNetwork, setSelectedNetwork] = useState(network);

  useEffect(() => {
    setSelectedNetwork(network);
  }, [network]);

  return (
    <TextField
      select
      value={selectedNetwork}
      onChange={(e) => {
        setSelectedNetwork(e.target.value as Chains);
        onChange?.(e);
      }}
      {...props}
    >
      {currentChains.map((chain) => (
        <MenuItem key={chain.chainId} value={chain.id} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={chain.img} sx={{ width: 20, height: 20, marginRight: 1 }} />
          {chain.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
