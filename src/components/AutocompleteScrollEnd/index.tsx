import React from 'react';
import { Autocomplete, AutocompleteProps } from '@mui/material';

export interface AutocompleteScrollEndProps {
  onScroll?: (event: React.UIEvent<HTMLUListElement, UIEvent>) => void;
  onScrollEnd?: () => void;
}

export const AutocompleteScrollEnd = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({
  onScroll,
  onScrollEnd,
  ...props
}: Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'onScroll'> & AutocompleteScrollEndProps) => (
  <Autocomplete
    {...props}
    ListboxProps={{
      role: '',
      ...props?.ListboxProps,
      onScroll: (event) => {
        const listboxNode = event.currentTarget;
        if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
          onScrollEnd?.();
        }
        onScroll?.(event);
      },
    }}
  />
);
