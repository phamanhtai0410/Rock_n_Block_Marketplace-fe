import { useMemo } from 'react';
import { Box, Button, Link, Skeleton, styled, Typography, useTheme } from '@mui/material';
import { isProduction, routes } from 'appConstants';
import { mockAva } from 'assets/images';
import { Spinner } from 'components';
import { NumberAmount } from 'components/NumberAmount';
import { Table } from 'components/Table';
import { ColumnData } from 'components/Table/Table.types';
import { useShallowSelector } from 'hooks';
import { range, round } from 'lodash';
import moment from 'moment';
import { chains } from 'services/WalletService/config';
import collectionsActionTypes from 'store/collections/actionTypes';
import collectionsSelectors from 'store/collections/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_SECONDARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Chains, RequestStatus } from 'types';
import { Method } from 'types/api/enums';
import { shortenPhrase } from 'utils';
import { shortenName } from 'utils/shortenName';

import { ActivityAccordion } from './components/ActivityAccordion';
import { ActivityAccordionSkeleton } from './components/ActivityAccordionSkeleton';

export enum ActivityTableField {
  Type,
  Items,
  Price,
  Quantity,
  From,
  To,
  Time,
}

const activityTableColumns: ColumnData[] = [
  { id: ActivityTableField.Type, title: 'Type', width: '10%' },
  { id: ActivityTableField.Items, title: 'Items', width: '20%' },
  { id: ActivityTableField.Price, title: 'Price', width: '15%' },
  { id: ActivityTableField.Quantity, title: 'Quantity', width: '10%' },
  { id: ActivityTableField.From, title: 'From', width: '15%' },
  { id: ActivityTableField.To, title: 'To', width: '15%' },
  { id: ActivityTableField.Time, title: 'Time', width: '15%' },
];

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: FontWeights.fontWeightBold,
  color: theme.themeColors.colorFooterText,
  lineHeight: '1rem',
  textTransform: 'uppercase',
}));

export interface CollectionActivityTableProps {
  activityPage: number;
  onLoadMore?: () => void;
}

export const CollectionActivityTable = ({ activityPage, onLoadMore }: CollectionActivityTableProps) => {
  const theme = useTheme();
  const { tokens } = useShallowSelector(userSelector.getUser);
  const { singleCollection, collectionActivity } = useShallowSelector(collectionsSelectors.getCollections);
  const { [collectionsActionTypes.GET_COLLECTION_ACTIVITY]: getCollectionActivityStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const collectionBlockExplorerUrl =
    chains?.[singleCollection?.network.name as Chains]?.[isProduction ? 'mainnet' : 'testnet']?.blockExplorerUrl || '';

  const rows = useMemo(
    () =>
      collectionActivity?.results?.map((activityRow) => {
        const activityToken = tokens?.find(
          (token) => token.symbol === activityRow.currency && token.network === singleCollection?.network.name,
        );
        const priceUsd = +(activityRow?.price || 0) * +(activityToken?.rate || 0);
        const explorerLink = `${collectionBlockExplorerUrl}tx/${activityRow.txHash}`;
        return { ...activityRow, priceUsd, explorerLink };
      }),
    [collectionBlockExplorerUrl, collectionActivity?.results, tokens, singleCollection?.network.name],
  );

  return (
    <>
      <Table
        columns={activityTableColumns}
        rows={(
          rows?.map((activityRow) => {
            return {
              [ActivityTableField.Type]: { value: activityRow.method, title: <Box>{activityRow.method}</Box> },
              [ActivityTableField.Items]: {
                value: activityRow.tokenId,
                title: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    <Typography variant="body1" className="s1" sx={{ fontWeight: FontWeights.fontWeightMedium }}>
                      {shortenPhrase(activityRow.tokenName || '', 7, 3)}
                    </Typography>
                  </Box>
                ),
              },
              [ActivityTableField.Price]: {
                value: activityRow.price,
                title: activityRow.price && (
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: FontWeights.fontWeightMedium }}>
                      <NumberAmount
                        value={
                          <>
                            {activityRow.price} {activityRow.currency}
                          </>
                        }
                      >
                        {round(+(activityRow.price || 0), 8)} {activityRow.currency}
                      </NumberAmount>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: FontWeights.fontWeightMedium,
                        color: theme.themeColors.colorTextActivityTablePriceDollar,
                        display: 'flex',
                      }}
                    >
                      <NumberAmount value={<>$ {activityRow.priceUsd}</>}>
                        $ {round(activityRow.priceUsd, 2)}
                      </NumberAmount>
                    </Typography>
                  </Box>
                ),
              },
              [ActivityTableField.Quantity]: {
                value: activityRow.amount,
                title: <Box sx={{ textAlign: 'center' }}>{activityRow.amount}</Box>,
              },
              [ActivityTableField.From]: {
                value: activityRow.fromId,
                title: (
                  <Box>
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
                  </Box>
                ),
              },
              [ActivityTableField.To]: {
                value: activityRow.toId,
                title: (
                  <Box>
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
                  </Box>
                ),
              },
              [ActivityTableField.Time]: {
                value: activityRow.toId,
                title: (
                  <Box>
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
                  </Box>
                ),
              },
            };
          }) || []
        ).concat(
          getCollectionActivityStatus === RequestStatus.REQUEST || !rows?.length
            ? range(8)
                .map((value) => `${value}` as Method)
                .map((value) => ({
                  [ActivityTableField.Type]: {
                    value,
                    title: (
                      <Skeleton
                        variant="text"
                        sx={{
                          width: 64,
                        }}
                      />
                    ),
                  },
                  [ActivityTableField.Items]: {
                    value,
                    title: <Skeleton variant="text" sx={{ width: 64 }} />,
                  },
                  [ActivityTableField.Price]: {
                    value,
                    title: <Skeleton variant="text" sx={{ width: 64 }} />,
                  },
                  [ActivityTableField.Quantity]: {
                    value,
                    title: <Skeleton variant="text" sx={{ width: 64 }} />,
                  },
                  [ActivityTableField.From]: {
                    value,
                    title: <Skeleton variant="text" sx={{ width: 64 }} />,
                  },
                  [ActivityTableField.To]: {
                    value,
                    title: <Skeleton variant="text" sx={{ width: 64 }} />,
                  },
                  [ActivityTableField.Time]: {
                    value,
                    title: <Skeleton variant="text" sx={{ width: 64 }} />,
                  },
                }))
            : [],
        )}
        sx={{ display: { xs: 'none', md: 'block' } }}
      />
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {rows
          ?.map((activityRow) => <ActivityAccordion key={activityRow.id} activityRow={activityRow} />)
          .concat(
            getCollectionActivityStatus === RequestStatus.REQUEST
              ? range(8).map((value) => <ActivityAccordionSkeleton key={value} />)
              : [],
          )}
      </Box>

      {activityPage < (collectionActivity?.totalPages || 1) && (
        <Button
          onClick={onLoadMore}
          disabled={getCollectionActivityStatus === RequestStatus.REQUEST}
          endIcon={getCollectionActivityStatus === RequestStatus.REQUEST ? <Spinner type="simple" /> : null}
          variant="outlined"
          sx={{ mb: 8 }}
        >
          Load more
        </Button>
      )}
    </>
  );
};
