import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Box, Button, IconButton, Stack, SxProps, TextField, Theme } from '@mui/material';
import { Trash } from 'components/Icon/components';
import { COLOR_NEUTRALS_2, COLOR_NEUTRALS_4 } from 'theme/colors';
import { TextFieldLabel } from 'theme/variables';
import { flexHelper } from 'utils';

export type AddressType<T extends FieldValues> = {
  pathToItem: (number) => Path<T>;
  fieldArrayName: Path<any>;
  watch: UseFormRegister<T>;
  register: UseFormRegister<T>;
  onRemoveSubcategory?: () => void;
  control: Control<any>;
  errors: FieldErrors<T>;
  pathToError: (number) => Merge<FieldError, FieldErrorsImpl<{ address: string }>> | undefined;
  isCanEdit?: boolean;
  sx?: SxProps<Theme>;
};

export const Address = <T extends FieldValues>(props: AddressType<T>) => {
  const {
    fieldArrayName,
    isCanEdit = true,
    pathToItem,
    watch,
    register,
    pathToError,
    onRemoveSubcategory,
    control,
    sx,
  } = props;

  const { fields, remove, append } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  return (
    <>
      <Stack spacing={1}>
        <TextFieldLabel>Collection Address</TextFieldLabel>
        {fields.map((address, addressIndex) => {
          return (
            <Box key={address.id} sx={{ ...flexHelper('flex-start', 'center') }}>
              <TextField
                error={Boolean(pathToError(addressIndex))}
                disabled={!isCanEdit}
                value={watch(pathToItem(addressIndex))}
                {...register(pathToItem(addressIndex))}
                sx={{ width: '100%', maxWidth: '540px', ...sx }}
                placeholder="0x76F2a66D8Af418113725e3bAc20BFCb4F92d63b5"
              />
              {fields.length > 1 && (
                <IconButton sx={{ ml: 1.5, color: COLOR_NEUTRALS_2 }} onClick={() => remove(addressIndex)}>
                  <Trash sx={{ fill: 'none' }} />
                </IconButton>
              )}
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" spacing={1.5} mt={2}>
        {isCanEdit && (
          <Button variant="outlined" size="small" onClick={() => append({ address: '' })}>
            Add address +
          </Button>
        )}
        {onRemoveSubcategory && (
          <Button sx={{ p: 0, mt: 2.5, color: COLOR_NEUTRALS_4 }} variant="text" onClick={onRemoveSubcategory}>
            Delete subcategory
          </Button>
        )}
      </Stack>
    </>
  );
};
