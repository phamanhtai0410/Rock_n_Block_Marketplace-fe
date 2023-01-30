import type {} from '@mui/lab/themeAugmentation';
import { createTheme, ThemeOptions } from '@mui/material';
import {
  getMuiButtonDefaultProps,
  getMuiButtonOverrides,
  getMuiToggleButtonDefaultProps,
  getMuiToggleButtonOverrides,
} from 'theme/Button';
import { COLOR_BLACK } from 'theme/colors';
import { getMuiContainerDefaultProps, getMuiContainerOverrides } from 'theme/Container';
import { breakpointOptions, getMuiGridDefaultProps, getMuiGridOverrides } from 'theme/Grid';
import { getTypographyOptions } from 'theme/Typography';

import { getMuiLoadingButtonDefaultProps, getMuiLoadingButtonOverrides } from './Button/LoadingButton.theme';
import { getMuiCheckbox, getMuiCheckboxDefaultProps } from './Checkbox/Checkbox.theme';
import { colorThemes } from './colors/colorTheme';
import { getMuiAccordion, getMuiAccordionDetails, getMuiAccordionPropsDefaultProps } from './Accordion';
import { getMuiBackdropDefaultProps, getMuiBackdropOverrides } from './Backdrop';
import { getMuiBreadcrumbsDefaultProps, getMuiBreadcrumbsOverrides } from './Breadcrumbs';
import { getMuiCssBaselineDefaultProps, getMuiCssBaselineOverrides } from './CssBaseLine';
import { getMuiDialogDefaultProps, getMuiDialogOverrides } from './Dialog';
import { getMuiDividerOverrides } from './Divider';
import { getMuiFormControlLabelDefaultProps, getMuiFormControlLabelOverrides } from './FormControlLabel';
import { getMuiIconButtonDefaultProps, getMuiIconButtonOverrides } from './IconButton';
import { getMuiLinkDefaultProps, getMuiLinkOverrides } from './Link';
import { getMuiListOverrides } from './List';
import { getMuiMenuItemOverrides, getMuiMenuOverrides } from './Menu';
import { getMuiPopoverDefaultProps, getMuiPopoverOverrides } from './Popover';
import { getMuiRadio, getMuiRadioDefaultProps } from './Radio';
import { getMuiSelectDefaultProps, getMuiSelectOverrides } from './Select';
import { getMuiSliderDefaultProps, getMuiSliderOverrides } from './Slider';
import { getMuiSwitchDefaultProps, getMuiSwitchOverrides } from './Switch';
import { getMuiTabButtonOverrides, getMuiTabOverrides, getMuiTabsDefaultProps, getMuiTabsOverrides } from './Tab';
import {
  getMuiFilledInputDefaultProps,
  getMuiFilledInputOverrides,
  getMuiTextFieldDefaultProps,
  getMuiTextFieldOverrides,
} from './TextField';

export const getTheme = (themeColors: typeof colorThemes.light) => {
  const themeBase = createTheme(
    {
      palette: {
        primary: {
          main: COLOR_BLACK,
        },
      },
      breakpoints: breakpointOptions,
    },
    {
      themeColors,
    },
  );

  return createTheme(themeBase, {
    components: {
      MuiTypography: {
        styleOverrides: getTypographyOptions(themeBase),
      },
      MuiGrid: {
        defaultProps: getMuiGridDefaultProps(),
        styleOverrides: getMuiGridOverrides(),
      },
      MuiContainer: {
        defaultProps: getMuiContainerDefaultProps(),
        styleOverrides: getMuiContainerOverrides(themeBase),
      },
      MuiBackdrop: {
        defaultProps: getMuiBackdropDefaultProps(),
        styleOverrides: getMuiBackdropOverrides(themeBase),
      },
      MuiButton: {
        defaultProps: getMuiButtonDefaultProps(),
        styleOverrides: getMuiButtonOverrides(themeBase),
      },
      MuiIconButton: {
        defaultProps: getMuiIconButtonDefaultProps(),
        styleOverrides: getMuiIconButtonOverrides(themeBase),
      },
      MuiToggleButton: {
        defaultProps: getMuiToggleButtonDefaultProps(),
        styleOverrides: getMuiToggleButtonOverrides(themeBase),
      },
      MuiLoadingButton: {
        defaultProps: getMuiLoadingButtonDefaultProps(),
        styleOverrides: getMuiLoadingButtonOverrides(),
      },
      MuiDialog: {
        defaultProps: getMuiDialogDefaultProps(),
        styleOverrides: getMuiDialogOverrides(themeBase),
      },
      MuiCssBaseline: {
        defaultProps: getMuiCssBaselineDefaultProps(),
        styleOverrides: getMuiCssBaselineOverrides(themeBase),
      },
      MuiPopover: {
        defaultProps: getMuiPopoverDefaultProps(),
        styleOverrides: getMuiPopoverOverrides(themeBase),
      },
      MuiSelect: {
        defaultProps: getMuiSelectDefaultProps(),
        styleOverrides: getMuiSelectOverrides(themeBase),
      },
      MuiCheckbox: {
        defaultProps: getMuiCheckboxDefaultProps(),
        styleOverrides: getMuiCheckbox(themeBase),
      },
      MuiTextField: {
        defaultProps: getMuiTextFieldDefaultProps(),
        styleOverrides: getMuiTextFieldOverrides(themeBase),
      },
      MuiAccordion: {
        defaultProps: getMuiAccordionPropsDefaultProps(),
        styleOverrides: getMuiAccordion(themeBase),
      },
      MuiAccordionDetails: {
        styleOverrides: getMuiAccordionDetails(themeBase),
      },
      MuiSwitch: {
        defaultProps: getMuiSwitchDefaultProps(),
        styleOverrides: getMuiSwitchOverrides(themeBase),
      },
      MuiSlider: {
        defaultProps: getMuiSliderDefaultProps(themeBase),
        styleOverrides: getMuiSliderOverrides(themeBase),
      },
      MuiLink: {
        defaultProps: getMuiLinkDefaultProps(),
        styleOverrides: getMuiLinkOverrides(themeBase),
      },
      MuiMenu: {
        styleOverrides: getMuiMenuOverrides(themeBase),
        MuiLink: {
          defaultProps: getMuiLinkDefaultProps(),
          styleOverrides: getMuiLinkOverrides(themeBase),
        },
      },
      MuiMenuItem: {
        styleOverrides: getMuiMenuItemOverrides(themeBase),
      },
      MuiList: {
        styleOverrides: getMuiListOverrides(themeBase),
      },
      MuiFormControlLabel: {
        styleOverrides: getMuiFormControlLabelOverrides(),
        defaultProps: getMuiFormControlLabelDefaultProps(),
      },
      MuiDivider: {
        styleOverrides: getMuiDividerOverrides(themeBase),
      },
      MuiRadio: {
        styleOverrides: getMuiRadio(themeBase),
        defaultProps: getMuiRadioDefaultProps(),
      },
      MuiFilledInput: {
        defaultProps: getMuiFilledInputDefaultProps(),
        styleOverrides: getMuiFilledInputOverrides(themeBase),
      },
      MuiTabs: {
        styleOverrides: getMuiTabsOverrides(themeBase),
        defaultProps: getMuiTabsDefaultProps(),
      },
      MuiTab: {
        styleOverrides: getMuiTabOverrides(themeBase),
        defaultProps: { disableRipple: true },
      },
      MuiBreadcrumbs: {
        defaultProps: getMuiBreadcrumbsDefaultProps(),
        styleOverrides: getMuiBreadcrumbsOverrides(themeBase),
      },
      MuiTabScrollButton: {
        styleOverrides: getMuiTabButtonOverrides(themeBase),
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
    },
  } as ThemeOptions);
};
