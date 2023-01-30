import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { ChainSelect } from 'components/ChainSelect';
import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import userSelector from 'store/user/selectors';
import { TextFieldLabel } from 'theme/variables';
import { Chains } from 'types';

import { IFormInputs } from '../..';

export type InformationTypes = {
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  isForEdit: boolean;
};

export const Information: FC<InformationTypes> = ({ register, isForEdit, errors }) => {
  const { provider } = useShallowSelector(userSelector.getUser);
  const { connect } = useWalletConnectorContext();
  return (
    <>
      <Typography sx={{ mb: 4 }} variant="body2">
        Information
      </Typography>
      <TextFieldLabel>{errors.name?.message || 'Name'}</TextFieldLabel>
      <TextField
        disabled={isForEdit}
        error={Boolean(errors.name)}
        placeholder="e. g. “Redeemable Bitcoin Card with logo”"
        {...register('name')}
        sx={{ mb: 4, width: '100%', maxWidth: '443px' }}
      />
      <TextFieldLabel>Network</TextFieldLabel>
      <ChainSelect
        sx={{ width: '300px', mb: 4 }}
        onChange={(e) => connect(provider, e.target.value as Chains, false, true)}
      />
      <TextFieldLabel>{errors.symbol?.message || 'symbol'}</TextFieldLabel>
      <TextField
        disabled={isForEdit}
        placeholder="AAA"
        error={Boolean(errors.symbol)}
        {...register('symbol')}
        sx={{ mb: 4 }}
      />
      <TextFieldLabel>{errors.description?.message || 'Description'}</TextFieldLabel>
      <TextField
        multiline
        rows={5}
        error={Boolean(errors.description)}
        placeholder="e. g. “After purchasing you will able to recived the logo...”"
        {...register('description')}
        sx={{ mb: 4, width: '100%', maxWidth: '443px' }}
      />
    </>
  );
};
