import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormControlLabel, FormGroupProps, Radio, RadioGroup, Stack } from '@mui/material';
import { NftStandard } from 'types';

import { IFormInputs } from '../..';

export type NftVariantsProps = {
  register: UseFormRegister<IFormInputs>;
  sxProp?: FormGroupProps['sx'];
};

export const NftVariants: FC<NftVariantsProps> = ({ register, sxProp }) => {
  return (
    <RadioGroup
      aria-labelledby="nftStandard"
      defaultValue={NftStandard.ERC721}
      name="nftStandard"
      sx={{ mb: 5, ...sxProp }}
    >
      <Stack direction="row" spacing={3}>
        <FormControlLabel {...register('standard')} value={NftStandard.ERC721} control={<Radio />} label="Single Nft" />
        <FormControlLabel
          {...register('standard')}
          value={NftStandard.ERC1155}
          control={<Radio />}
          label="Multiple Nft"
        />
      </Stack>
    </RadioGroup>
  );
};
