import { FC } from 'react';
import { FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Card } from 'components';
import { Address } from 'modules/games/components';
import { getCategoryFormId, IListFormInputs } from 'modules/games/containers';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { TextFieldLabel } from 'theme/variables';

export type CategoriesProps = {
  register: UseFormRegister<IListFormInputs>;
  errors: FieldErrors<IListFormInputs>;
  control: Control<any>;
  watch: UseFormRegister<IListFormInputs>;
  categoryIndex: number;
};

export const Subcategories: FC<CategoriesProps> = ({ register, categoryIndex, errors, control, watch }) => {
  const theme = useTheme();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `categories[${categoryIndex}].subcategories`,
  });

  return (
    <Box>
      {fields.map((subcategory, subcategoryIndex) => {
        return (
          <Card
            key={subcategory.id}
            error={Boolean(errors.categories?.[categoryIndex]?.subcategories?.[subcategoryIndex])}
            sx={{ background: theme.themeColors.colorBackground, padding: 2, mt: 2.5 }}
          >
            <TextFieldLabel>Subcategory name</TextFieldLabel>
            <TextField
              error={Boolean(errors[getCategoryFormId({ categoryIndex, subcategoryIndex })])}
              {...register(getCategoryFormId({ categoryIndex, subcategoryIndex }))}
              value={watch(getCategoryFormId({ categoryIndex, subcategoryIndex }))}
              sx={{ mb: 2.5, width: '100%', maxWidth: '540px' }}
              placeholder="Subcategory name"
            />

            <Address<IListFormInputs>
              {...{
                register,
                errors,
                control,
                watch,
                categoryIndex,
                subcategoryIndex,
                ...(fields.length > 1 && { onRemoveSubcategory: () => remove(subcategoryIndex) }),
              }}
              pathToError={(addressIndex) =>
                errors?.categories?.[categoryIndex]?.subcategories?.[subcategoryIndex]?.addresses?.[addressIndex]
                  ?.address
              }
              pathToItem={(addressIndex) =>
                `categories.${categoryIndex}.subcategories.${subcategoryIndex}.addresses.${addressIndex}.address`
              }
              fieldArrayName={`categories.${categoryIndex}.subcategories.${subcategoryIndex}.addresses`}
            />
          </Card>
        );
      })}

      <Button
        sx={{ p: 0, mt: 2.5 }}
        variant="text"
        onClick={() => append([{ name: '', addresses: [{ address: '' }] }])}
      >
        <Typography color={COLOR_PRIMARY_1}>Add subcategory +</Typography>
      </Button>
    </Box>
  );
};
