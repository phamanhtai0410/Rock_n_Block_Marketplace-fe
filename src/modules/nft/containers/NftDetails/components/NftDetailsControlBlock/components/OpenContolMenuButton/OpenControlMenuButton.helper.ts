import { ArrowRightBorder, Close, Fire, Lightning } from 'components/Icon/components';

export enum ControlTypes {
  burn = 'burn',
  changePrice = 'changePrice',
  transfer = 'transfer',
  remove = 'remove',
  promote = 'promote',
  list = 'list',
}

export const openControlMenuButtonItems = {
  selling: [
    {
      Icon: ArrowRightBorder,
      label: 'Change price',
      value: ControlTypes.changePrice,
    },
    {
      Icon: ArrowRightBorder,
      label: 'Transfer token',
      value: ControlTypes.transfer,
    },
    {
      Icon: Close,
      label: 'Remove from sale',
      value: ControlTypes.remove,
    },
    {
      Icon: Lightning,
      label: 'Promote',
      value: ControlTypes.promote,
    },
    {
      Icon: Fire,
      label: 'Burn token',
      value: ControlTypes.burn,
    },
  ],
  notSelling: [
    {
      Icon: ArrowRightBorder,
      label: 'Transfer token',
      value: ControlTypes.transfer,
    },
    {
      Icon: ArrowRightBorder,
      label: 'List for sale',
      value: ControlTypes.list,
    },
    {
      Icon: Lightning,
      label: 'Promote',
      value: ControlTypes.promote,
    },
    {
      Icon: Fire,
      label: 'Burn token',
      value: ControlTypes.burn,
    },
  ],
};

export const getAvailableActions = (isSeller: boolean, isHighestBid: boolean, isImported?: boolean) => {
  if (isHighestBid) {
    return [
      {
        Icon: Lightning,
        label: 'Promote',
        value: ControlTypes.promote,
      },
    ];
  }

  if (isSeller) {
    return openControlMenuButtonItems.selling.filter((actions) => {
      if (isImported) {
        return actions.value !== ControlTypes.burn;
      }
      return true;
    });
  }
  return openControlMenuButtonItems.notSelling.filter((actions) => {
    if (isImported) {
      return actions.value !== ControlTypes.burn;
    }
    return true;
  });
};
