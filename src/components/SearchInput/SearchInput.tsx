import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  ClickAwayListener,
  Grow,
  MenuList,
  Popper,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from '@mui/material';
import { routes } from 'appConstants';
import { Icon } from 'components/Icon';
import { SearchResult } from 'components/SearchResults/SearchResults';
import { Spinner } from 'components/Spinner';
import { COLOR_NEUTRALS_5 } from 'theme/colors/colors.constant';
import { RequestStatus } from 'types';
import { FastSearch } from 'types/api/FastSearch';

export type SearchInputProps = {
  presearchNfts?: FastSearch;
  handleResultClick: () => void;
  searchNftsStatus: RequestStatus;
} & TextFieldProps;

export const SearchInput = ({ presearchNfts, handleResultClick, searchNftsStatus, ...rest }: SearchInputProps) => {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setOpen(!!event.target.value);
      rest?.onChange?.(event);
    },
    [rest],
  );

  const handleClick = useCallback(() => {
    if (rest?.value) {
      setOpen(true);
    }
  }, [rest?.value]);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const notifications = useMemo(() => {
    if (presearchNfts?.tokens.length || presearchNfts?.users?.length || presearchNfts?.collections?.length) {
      const userNotifications = presearchNfts?.users?.map((user) => {
        return (
          <SearchResult
            key={`user_${user.id}`}
            to={routes.profile.root.getPath(user.url || 0)}
            name={user.name}
            image={user.avatar}
            onClick={handleResultClick}
          />
        );
      });

      const tokenNotifications = presearchNfts?.tokens?.map((token) => {
        return (
          <SearchResult
            key={`token_${token.id}`}
            to={routes.nft.root.getPath(token.id || 0)}
            name={token.name}
            image={token.media}
            onClick={handleResultClick}
          />
        );
      });

      const collectionNotification = presearchNfts?.collections?.map((collection) => {
        return (
          <SearchResult
            key={`collection_${collection.id}`}
            to={routes.collections.root.getPath(collection.id || 0)}
            name={collection.name}
            image={collection.avatar}
            onClick={handleResultClick}
          />
        );
      });
      return [...(userNotifications || []), ...tokenNotifications, ...collectionNotification];
    }
    return [];
  }, [handleResultClick, presearchNfts?.collections, presearchNfts?.tokens, presearchNfts?.users]);

  return (
    <>
      <TextField
        {...rest}
        ref={anchorRef}
        InputProps={{
          endAdornment: <Icon.Loop sx={{ color: COLOR_NEUTRALS_5 }} />,
        }}
        autoComplete="off"
        onChange={handleChange}
        onClick={handleClick}
        sx={{ height: '40px', ...rest?.sx }}
      />
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{ zIndex: 1 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <MenuList sx={{ marginTop: 1, maxHeight: 450, overflowY: 'auto' }}>
                {!!notifications.length && searchNftsStatus !== RequestStatus.REQUEST && notifications}
                {!notifications.length &&
                  (searchNftsStatus === RequestStatus.SUCCESS || searchNftsStatus === RequestStatus.ERROR) && (
                    <Typography key={0} sx={{ padding: theme.spacing(1, 3) }}>
                      No results found
                    </Typography>
                  )}
                {searchNftsStatus === RequestStatus.REQUEST && (
                  <Stack
                    key={0}
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center', padding: theme.spacing(1, 3), svg: { width: '24px' } }}
                  >
                    <Typography>Loading...</Typography>
                    <Spinner />
                  </Stack>
                )}
              </MenuList>
            </Grow>
          )}
        </Popper>
      </ClickAwayListener>
    </>
  );
};
