import { Skeleton, Stack, styled } from '@mui/material';

const StyledSkeleton = styled(Skeleton)({
  borderRadius: '8px',
});

export const DataSkeleton = () => {
  return (
    <Stack spacing={3} width="100%">
      <Skeleton
        variant="text"
        sx={{
          width: '100%',
          height: 40,
        }}
      />
      <Skeleton
        variant="text"
        sx={{
          width: '30%',
          height: 20,
        }}
      />
      <Skeleton
        variant="text"
        sx={{
          width: '30%',
          height: 20,
        }}
      />
      <Skeleton
        variant="text"
        sx={{
          width: '100%',
          height: 40,
        }}
      />
      <StyledSkeleton
        variant="rectangular"
        sx={{
          height: 200,
        }}
      />
      <StyledSkeleton
        variant="rectangular"
        sx={{
          height: 64,
        }}
      />
      <StyledSkeleton
        variant="rectangular"
        sx={{
          height: 40,
        }}
      />
      <StyledSkeleton
        variant="rectangular"
        sx={{
          height: 270,
        }}
      />
    </Stack>
  );
};
