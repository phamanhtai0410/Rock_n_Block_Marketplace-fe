import React, { FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowDown } from 'components/Icon/components';
import { PropertyCard } from 'modules/nft/containers/NftDetails/components/PropertyCard';
import { FontWeights } from 'theme/Typography';
import { Property } from 'types/api/Property';

export type NftDetailsPropertiesProps = {
  nftProperties?: Property[];
};

export const NftDetailsProperties: FC<NftDetailsPropertiesProps> = ({ nftProperties }) => {
  const theme = useTheme();
  return (
    <Box mt={3}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <IconButton className="border">
              <ArrowDown />
            </IconButton>
          }
          sx={{ padding: 0 }}
        >
          <Typography
            className="xl"
            color={theme.themeColors.colorTextFieldBorderFocusBold}
            fontWeight={FontWeights.fontWeightSemiBold}
          >
            Properties
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingTop: 2 }}>
          <Grid container spacing={2.5}>
            {nftProperties?.map((property) => (
              <Grid item key={property.traitType} xs={12} sm={6}>
                <PropertyCard {...property} sx={{ height: '100%' }} />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 2 }} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
