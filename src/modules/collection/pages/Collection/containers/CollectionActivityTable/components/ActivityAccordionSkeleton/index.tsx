import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { SelectArrowDown } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';

import { Subtitle } from '../..';

export const ActivityAccordionSkeleton = () => {
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
        <Typography sx={{ fontWeight: FontWeights.fontWeightMedium }}>
          <Box>
            <Skeleton variant="text" sx={{ width: 64, backgroundColor: theme.themeColors.colorTableText }} />
          </Box>
          <Box>
            <Skeleton variant="text" sx={{ width: 32, backgroundColor: theme.themeColors.colorTableText }} />
          </Box>
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
            <Skeleton variant="text" sx={{ width: 64, backgroundColor: theme.themeColors.colorTableText }} />
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
              <Skeleton variant="text" sx={{ width: 64, backgroundColor: theme.themeColors.colorTableText }} />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              To
            </Typography>
            <Typography>
              <Skeleton variant="text" sx={{ width: 64, backgroundColor: theme.themeColors.colorTableText }} />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              Quantity
            </Typography>
            <Typography>
              <Skeleton variant="text" sx={{ width: 64, backgroundColor: theme.themeColors.colorTableText }} />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component={Subtitle} sx={{ marginBottom: 0.5 }}>
              Time
            </Typography>
            <Typography>
              <Skeleton variant="text" sx={{ width: 64, backgroundColor: theme.themeColors.colorTableText }} />
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
