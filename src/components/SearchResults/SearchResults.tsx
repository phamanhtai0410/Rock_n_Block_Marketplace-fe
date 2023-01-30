import { Link } from 'react-router-dom';
import { Box, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Spinner } from 'components';
import { FastSearch } from 'types/api/FastSearch';
import { RequestStatus } from 'types/store';

export interface SearchResultProps {
  to: string;
  name?: string;
  image?: string;
  onClick: () => void;
}

export const SearchResult = ({ to, name, image, onClick }: SearchResultProps) => (
  <MenuItem component={Link} to={to} onClick={onClick}>
    <Box
      component="img"
      src={image}
      alt=""
      sx={{
        width: 32,
        height: 32,
        objectFit: 'cover',
        objectPosition: 'center',
        marginRight: '8px',
        borderRadius: 0.5,
      }}
    />
    <Box sx={{ display: 'flex', alignItems: 'center' }}>{name}</Box>
  </MenuItem>
);

export interface SearchResultsProps {
  searchNftsStatus: RequestStatus;
  presearchNfts?: FastSearch;
  handleResultClick: () => void;
}

export const SearchResults = ({ searchNftsStatus, presearchNfts, handleResultClick }: SearchResultsProps) => {
  const theme = useTheme();

  if (searchNftsStatus === RequestStatus.REQUEST) {
    return (
      <Stack
        key={0}
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', padding: theme.spacing(1, 3), svg: { width: '24px' } }}
      >
        <Typography>Loading...</Typography>
        <Spinner />
      </Stack>
    );
  }

  if (presearchNfts) {
    if (presearchNfts.tokens.length + (presearchNfts?.users?.length || 0) > 0) {
      return (
        <>
          {presearchNfts.tokens.map((token) => (
            <SearchResult
              key={token.id}
              to={routes.nft.root.getPath(token.id || 0)}
              name={token.name}
              image={token.media}
              onClick={handleResultClick}
            />
          ))}
          {presearchNfts?.users?.map((user) => (
            <SearchResult
              key={user.id}
              to={routes.profile.root.getPath(user.url || 0)}
              name={user.name}
              image={user.avatar}
              onClick={handleResultClick}
            />
          ))}
        </>
      );
    }

    return (
      <Typography key={0} sx={{ padding: theme.spacing(1, 3) }}>
        No results found
      </Typography>
    );
  }

  return null;
};
