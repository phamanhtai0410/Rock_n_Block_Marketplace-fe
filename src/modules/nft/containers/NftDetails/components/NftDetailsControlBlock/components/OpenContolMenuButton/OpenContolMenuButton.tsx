import { FC, useMemo, useState } from 'react';
import { Box, BoxProps, Divider, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { BagArrowIcon } from 'components/Icon/components';
import { Rates } from 'modules/create/containers';
import { ListForSaleCallback } from 'modules/nft/containers/NftDetails/NftDetails.types';
import { COLOR_PRIMARY_3 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Nullable } from 'types';
import { flexHelper } from 'utils';

import { BurnModal, PutOnSaleModal, RemoveModal, TransferModal, UpdatePriceModal } from '../../../modals';

import { ControlTypes, getAvailableActions } from './OpenControlMenuButton.helper';

export interface OpenContolMenuButtonProps {
  isSeller: boolean;
  currency: string;
  price: string | number;
  usdPrice: string | number;
  onUpdatePrice: ListForSaleCallback;
  onListForSale: ListForSaleCallback;
  onBurn: (amount?: number) => void;
  onTransfer: (recipientAddress: string, amount?: number) => void;
  isMultiple: boolean;
  rates: Rates[];
  onRemoveFromSale: () => void;
  ownedTokenAmount?: string;
  isHighestBid: boolean;
  onPromoteClick: () => void;
  royalties?: string;
  serviceFee?: string;
  isImported?: boolean;
}

export const OpenContolMenuButton: FC<OpenContolMenuButtonProps & BoxProps> = ({
  usdPrice,
  currency,
  isSeller,
  price,
  onUpdatePrice,
  onListForSale,
  onBurn,
  onTransfer,
  isMultiple,
  rates,
  onRemoveFromSale,
  ownedTokenAmount,
  isHighestBid,
  onPromoteClick,
  royalties,
  serviceFee,
  isImported,
  ...boxProps
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = useMemo(() => !!anchorEl, [anchorEl]);

  const [selectedControlModal, setSelectedContorlModal] = useState<Nullable<ControlTypes>>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: ControlTypes) => {
    if (value === ControlTypes.promote) {
      onPromoteClick();
      return;
    }
    setSelectedContorlModal(value);
    handleClose();
  };

  return (
    <Box {...boxProps}>
      <IconButton
        className="square"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          border: 'none',
          pt: 1.5,
          width: 48,
          height: 48,
          borderRadius: '50% !important',
        }}
      >
        <BagArrowIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { padding: 0, '& ul': { background: theme.themeColors.colorModalBackground, border: 'none' } },
        }}
      >
        {getAvailableActions(isSeller, isHighestBid, isImported).map(({ Icon, label, value }, index, array) => {
          return (
            <Box key={label}>
              <MenuItem
                sx={{
                  padding: theme.spacing(2, 2, 1.5),
                  margin: 0,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: theme.themeColors.colorShareButtonHover,
                  },
                }}
                onClick={() => handleMenuItemClick(value)}
              >
                <Typography
                  sx={{
                    fontWeight: FontWeights.fontWeightBold,
                    color: theme.themeColors.colorShareButtonLink,
                    ...flexHelper(),
                    ...(value === ControlTypes.burn && {
                      '& > svg': {
                        color: COLOR_PRIMARY_3,
                      },
                    }),
                  }}
                >
                  {Icon && (
                    <Icon
                      sx={{
                        mr: 2,
                      }}
                    />
                  )}
                  {label}
                </Typography>
              </MenuItem>
              {index < array.length - 1 && (
                <Divider
                  color={theme.themeColors.colorShareButtonItem}
                  variant="middle"
                  sx={{ '&.MuiDivider-root': { margin: theme.spacing(0, 2) } }}
                />
              )}
            </Box>
          );
        })}
      </Menu>
      <UpdatePriceModal
        currency={currency}
        price={price}
        onUpdatePrice={onUpdatePrice}
        open={selectedControlModal === ControlTypes.changePrice}
        rates={rates}
        onClose={() => setSelectedContorlModal(null)}
      />
      <BurnModal
        onBurn={onBurn}
        open={selectedControlModal === ControlTypes.burn}
        onClose={() => setSelectedContorlModal(null)}
        isMultiple={isMultiple}
        ownedTokenAmount={ownedTokenAmount}
      />
      <TransferModal
        onTransfer={onTransfer}
        open={selectedControlModal === ControlTypes.transfer}
        onClose={() => setSelectedContorlModal(null)}
        isMultiple={isMultiple}
        ownedTokenAmount={ownedTokenAmount}
      />
      <PutOnSaleModal
        onPutOnSale={onListForSale}
        rates={rates}
        open={selectedControlModal === ControlTypes.list}
        onClose={() => setSelectedContorlModal(null)}
        isMultiple={isMultiple}
        ownedTokenAmount={ownedTokenAmount}
        royalties={royalties}
        serviceFee={serviceFee}
      />
      <RemoveModal
        onRemove={onRemoveFromSale}
        open={selectedControlModal === ControlTypes.remove}
        onClose={() => setSelectedContorlModal(null)}
      />
    </Box>
  );
};
