import { FC, Fragment } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { TextFieldLabel } from 'theme/variables';

import { IFormInputs } from '../..';

import { socialMediaFormFields } from './SocialMedia.helper';

export type SocialMediaProps = {
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
};

export const SocialMedia: FC<SocialMediaProps> = ({ register, errors }) => {
  return (
    <>
      <Typography sx={{ mb: 4 }} variant="body2">
        Social media
      </Typography>
      {socialMediaFormFields.map(({ id, name, label, placeholder }) => {
        return (
          <Fragment key={id}>
            <TextFieldLabel>{(!!errors.socials && errors.socials[name]?.message) || label}</TextFieldLabel>
            <TextField
              error={Boolean(errors.socials?.[name])}
              placeholder={placeholder}
              {...register(`socials.${name}`)}
              sx={{ mb: 4, width: '100%', maxWidth: '443px' }}
            />
          </Fragment>
        );
      })}
    </>
  );
};
