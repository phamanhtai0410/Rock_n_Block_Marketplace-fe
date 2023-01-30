import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import { MainLogo, SocialLinks } from 'components';
import { useShallowSelector, useValidateInputField, ValidationTypes } from 'hooks';
import uiSelector from 'store/ui/selectors';
import { subscribeMail } from 'store/user/actions';
import userActionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';
import { FontWeights } from 'theme/Typography';
import { RequestStatus } from 'types';

import { InputInnerButton } from './components/InputInnerButton';
import { footerLinks, footerSocialLinks, termsItems } from './Footer.helpers';

const SUBSCRIBE_MAIL_SHOW_TIME = 3000;

export const Footer: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [inputValue, handleChangeInputValue, handleSetOriginValue] = useValidateInputField({
    type: ValidationTypes.string,
  });

  const handleSubscribeEmail = useCallback(() => {
    dispatch(subscribeMail({ emailAddress: inputValue }));
  }, [dispatch, inputValue]);

  const isSubscribeStatus = useShallowSelector(uiSelector.getProp(userActionTypes.SUBSCRIBE_MAIL));
  const { id: userId } = useShallowSelector(userSelector.getProp('user'));
  const isSubscribeSuccess = isSubscribeStatus === RequestStatus.SUCCESS;

  useEffect(() => {
    if (isSubscribeSuccess) {
      const timer = setTimeout(() => {
        handleSetOriginValue('');
      }, SUBSCRIBE_MAIL_SHOW_TIME);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [inputValue, handleSetOriginValue, isSubscribeSuccess]);

  return (
    <Box
      sx={{
        background: theme.themeColors.colorFooterBackground,
        zIndex: 99,
        '&:before': {
          content: '""',
          display: 'block',
          borderBottom: '1px solid',
          borderBottomWidth: 'thin',
          color: theme.themeColors.colorDivider,
        },
      }}
      mt="auto"
    >
      <Container>
        <Grid
          container
          pt={5.5}
          pb={5.25}
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: `1px solid ${theme.themeColors.colorDeepDivider}` }}
        >
          <Grid item container justifyContent="space-between" xs={12}>
            <Grid item container xs={12} md={2} justifyContent="space-between" direction="column" mb={{ xs: 7, md: 0 }}>
              <MainLogo />
            </Grid>
            <Grid item container xs={12} sm={6} md={5} justifyContent="space-between" mb={{ xs: 3, sm: 0 }}>
              {footerLinks.map(({ title, links }) => (
                <Stack key={title} spacing={5}>
                  <Typography variant="button" sx={{ color: theme.themeColors.colorFooterTitle }}>
                    {title}
                  </Typography>
                  <Stack spacing={1.25}>
                    {links.map(({ text, link, isAnchor = false }) => (
                      <Typography
                        {...(isAnchor
                          ? {
                              to: link,
                              component: RouterLink,
                            }
                          : {
                              component: Link,
                              target: '_blank',
                              rel: 'noreferrer',
                              href: typeof link === 'string' ? link : link(String(userId)),
                            })}
                        key={text}
                        variant="button"
                        fontWeight={FontWeights.fontWeightMedium}
                        className="s"
                        color={theme.themeColors.colorFooterLinkText}
                      >
                        {text}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Grid>

            <Grid item>
              <Stack spacing={{ xs: 5, md: 2 }}>
                <Typography variant="button" sx={{ color: theme.themeColors.colorFooterTitle }}>
                  Subscribe Us
                </Typography>
                <Stack spacing={{ xs: 3, md: 5 }}>
                  <InputInnerButton
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    onSubscribe={handleSubscribeEmail}
                    isSubscribeSuccess={isSubscribeSuccess}
                  />
                  <SocialLinks links={footerSocialLinks} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
          sx={{ py: { xs: 3, md: 0 } }}
        >
          <Grid item columnGap={1} xs={12} sm={6}>
            <Typography
              variant="body1"
              className="xs"
              fontWeight={FontWeights.fontWeightSemiBold}
              color={theme.themeColors.colorFooterText}
            >
              Copyright © 2022 LLC. All rights reserved
            </Typography>
          </Grid>

          <Grid
            item
            container
            xs={12}
            sm={6}
            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            columnGap={5}
            py={{ xs: 1, md: 4.5 }}
          >
            {termsItems.map(({ id, title, link }) => (
              <Link key={id} href={link} target="_blank" rel="noreferrer">
                <Typography
                  variant="body1"
                  className="xs"
                  fontWeight={FontWeights.fontWeightSemiBold}
                  color={theme.themeColors.colorFooterText}
                >
                  {title}
                </Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
