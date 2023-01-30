import { FC, useMemo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowDown } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';
import { transformPropertiesData } from 'utils';

import { PropertyRowCard } from '../PropertyRowCard';
import { SeeAllButton } from '../SeeAllButton';

export type CollectionPropertiesBlockProps = {
  collectionUrl?: string;
  subcategoryName?: string | null;
  onPropertyClick: (layerName: string, perkName: string) => void;
  properties?: Array<Record<string, any>>;
  activeProperties: Record<string, any>;
};

export const CollectionPropertiesBlock: FC<CollectionPropertiesBlockProps> = ({
  collectionUrl,
  subcategoryName,
  onPropertyClick,
  activeProperties,
  properties,
}) => {
  const chipsForRender = useMemo(
    () =>
      Object.entries(activeProperties ?? {}).map(([key, value]) => {
        return {
          key,
          label: value,
        };
      }),
    [activeProperties],
  );

  return (
    <Box>
      <Stack direction="row" flexWrap="wrap">
        {chipsForRender.map(({ key, label }) => {
          return (
            Array.isArray(label) &&
            label.map((item) => (
              <Chip
                key={key + item}
                label={item}
                onDelete={() => onPropertyClick(key, item)}
                sx={(theme) => ({
                  mb: 1,
                  ml: 1,
                  span: { lineHeight: '12px' },
                  background: theme.themeColors.colorChipBackground,
                  color: theme.themeColors.colorButtonSecondaryText,
                })}
              />
            ))
          );
        })}
      </Stack>
      <SeeAllButton collectionUrl={collectionUrl} subcategoryName={subcategoryName} />
      <Stack spacing={2}>
        {properties?.map((layer) => (
          <Box key={layer.name}>
            <Divider />
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary
                expandIcon={
                  <IconButton className="xs border">
                    <ArrowDown />
                  </IconButton>
                }
                sx={{ padding: 0 }}
              >
                <Typography variant="button" textTransform="uppercase" fontWeight={FontWeights.fontWeightSemiBold}>
                  {layer.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingTop: 2 }}>
                <Stack spacing={2}>
                  {transformPropertiesData(layer.perks).map(({ name, amount }) => {
                    const isPropertyCheckboxActive = Boolean(activeProperties[layer.name]?.includes(name));
                    return (
                      <PropertyRowCard
                        name={name}
                        key={name}
                        isActive={isPropertyCheckboxActive}
                        onPerkChangeClick={() => onPropertyClick(layer.name, name)}
                        amount={Number(amount)}
                      />
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
