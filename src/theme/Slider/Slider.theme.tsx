import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { ValueLabel } from 'components/ValueLabel';

export const getMuiSliderOverrides = (theme: Theme): ComponentsOverrides['MuiSlider'] => ({
  root: {
    height: 8,
    padding: '11px 0 !important',
    overflow: 'visible',
    '& > *': {
      '&.MuiSlider-markLabel[data-index="0"]': {
        left: '8%',
      },
      '&.MuiSlider-markLabel[data-index="1"]': {
        left: '90% !important',
      },
    },
  },
  rail: {
    height: 5,
    borderRadius: 4,
    opacity: 1,
    backgroundColor: theme.themeColors.colorSliderRail,
  },
  track: {
    height: 5,
    borderRadius: 4,
    border: 'none',
    background: theme.themeColors.colorSliderTrack,
  },
  thumb: {
    height: 24,
    width: 24,
    top: 3,
    background: theme.themeColors.colorSliderThumb,
    border: `4px solid ${theme.themeColors.colorSliderThumbBorder}`,
    transform: 'translate(-50%)',
    overflow: 'hidden',

    '&:hover': {
      boxShadow: 'none',
    },
  },
  mark: {
    display: 'none',
  },
  valueLabel: {},
  markLabel: {
    color: theme.themeColors.colorTextDefault,
  },
  active: {},
});

export const getMuiSliderDefaultProps = (theme: Theme): ComponentsProps['MuiSlider'] => ({
  components: {
    ValueLabel,
  },
  valueLabelDisplay: 'auto',
  step: 1,
});
