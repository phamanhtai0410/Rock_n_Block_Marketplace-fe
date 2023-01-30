import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Link, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { mockAva } from 'assets/images';
import { SelectArrowDown } from 'components/Icon/components';
import { NumberAmount } from 'components/NumberAmount';
import { round } from 'lodash';
import moment from 'moment';
import { COLOR_SECONDARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Activity } from 'types/api/Activity';
import { shortenPhrase } from 'utils';
import { shortenName } from 'utils/shortenName';

import { Subtitle } from '../..';

export interface ActivityAccordionProps {
  activityRow: Activity & { priceUsd: number; explorerLink: string };
}

export const ActivityAccordion = ({ activityRow }: ActivityAccordionProps) => {
  const theme = useTheme();
  return (
    <Accordion
      sx={{
        backgroundColor: theme.themeColors.colorModalBackground,
        borderRadius: '16px',
        marginBottom: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<SelectArrowDown />}
        sx={{
          '.MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
          },
          svg: { color: theme.themeColors.colorTextFieldBorderDefault },
        }}
      >
        {activityRow.tokenImage && (
          <Box component="a" href={routes.nft.root.getPath(+(activityRow.tokenId || 0))}>
            <Box
              component="img"
              src={activityRow.tokenImage}
              onError={(event) => {
                event.currentTarget.src = mockAva;
              }}
              sx={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
                width: 40,
                height: 40,
                marginRight: 1,
              }}
            />
          </Box>
        )}
        <Typography sx={{ fontWeight: FontWeights.fontWeightMedium }}>
          {shortenPhrase(activityRow.tokenName || '', 7, 3)}
        </Typography>
        <Typography
          sx={{
            fontWeight: FontWeights.fontWeightMedium,
            marginLeft: 'auto',
            marginRight: 1,
            textAlign: 'right',
          }}
        >
          <Box>
            <NumberAmount
              value={
                <>
                  {activityRow.price} {activityRow.currency}
                </>
              }
            >
              {round(+(activityRow.price || 0), 8)} {activityRow.currency}
            </NumberAmount>
          </Box>
          <Box sx={{ color: theme.themeColors.colorTextFieldBorderDefault }}>
            <NumberAmount value={<>$ {activityRow.priceUsd}</>}>$ {round(activityRow.priceUsd, 2)}</NumberAmount>
          </Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              From
            </Typography>
            <Typography>
              <Link
                href={routes.profile.root.getPath(activityRow.fromId || '')}
                sx={{
                  color: COLOR_SECONDARY_1,
                  fontWeight: FontWeights.fontWeightMedium,
                  textDecoration: 'underline',
                }}
              >
                {shortenName(activityRow.fromName)}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              To
            </Typography>
            <Typography>
              <Link
                href={routes.profile.root.getPath(activityRow.toId || '')}
                sx={{
                  color: COLOR_SECONDARY_1,
                  fontWeight: FontWeights.fontWeightMedium,
                  textDecoration: 'underline',
                }}
              >
                {shortenName(activityRow.toName)}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              Quantity
            </Typography>
            <Typography>{activityRow.amount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              Time
            </Typography>
            <Typography>
              <Link
                href={activityRow.explorerLink}
                sx={{
                  color: COLOR_SECONDARY_1,
                  fontWeight: FontWeights.fontWeightMedium,
                  textDecoration: 'underline',
                }}
              >
                {activityRow.date ? moment(activityRow.date).fromNow() : null}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
