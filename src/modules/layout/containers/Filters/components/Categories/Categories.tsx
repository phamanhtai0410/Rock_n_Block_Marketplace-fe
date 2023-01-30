import { FC } from 'react';
import { Box, Button, styled } from '@mui/material';
import { DEFAULT_VALUE_FOR_ALL_OPTION } from 'hooks/useFilters/useFilters.helpers';
import { COLOR_NEUTRALS_3, COLOR_NEUTRALS_4 } from 'theme/colors';
import { BORDER_RADIUS_BUTTON, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { flexHelper } from 'utils';

import { ICategory } from '../../Filters.types';

const categoryChipActiveStyles = {
  background: COLOR_NEUTRALS_3,
  color: '#fff',
};

const CategoryChip = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  color: COLOR_NEUTRALS_4,
  textTransform: 'capitalize',
  padding: theme.spacing(1.5, 3),
  borderRadius: BORDER_RADIUS_BUTTON,
  minWidth: 0,
  whiteSpace: 'nowrap',
  '&:hover': {
    ...categoryChipActiveStyles,
  },
}));

export type CategoriesProps = {
  categories?: ICategory[];
  activeCategory: string;
  onChangeActiveCategory: (id: string) => void;
};

export const Categories: FC<CategoriesProps> = ({ categories, activeCategory, onChangeActiveCategory }) => {
  return (
    <Box sx={{ overflowX: 'auto', borderRadius: BORDER_RADIUS_DEFAULT }}>
      <Box
        sx={(theme) => ({
          background: theme.themeColors.colorBackgroundSecondary,
          padding: theme.spacing(2, 2),
          gap: '10px',
          minWidth: 'fit-content',
          ...flexHelper('flex-start'),
          [theme.breakpoints.down(600)]: {
            background: 'none',
            padding: 0,
          },
        })}
      >
        <CategoryChip
          onClick={() => onChangeActiveCategory(DEFAULT_VALUE_FOR_ALL_OPTION)}
          sx={{ ...(activeCategory === DEFAULT_VALUE_FOR_ALL_OPTION && categoryChipActiveStyles) }}
          variant="text"
        >
          All items
        </CategoryChip>
        {categories?.map(({ title, icon, id }) => (
          <CategoryChip
            onClick={() => onChangeActiveCategory(id.toString())}
            sx={{ ...(activeCategory === id.toString() && categoryChipActiveStyles) }}
            key={title}
            variant="text"
          >
            <img src={icon} alt="icon" />
            <Box sx={{ marginLeft: 1 }}>{title}</Box>
          </CategoryChip>
        ))}
      </Box>
    </Box>
  );
};
