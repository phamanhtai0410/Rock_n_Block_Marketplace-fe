import { ComponentType, FC, ReactNode } from 'react';
import { Box, SvgIconProps, Typography } from '@mui/material';
import { forEach } from 'lodash';

import * as allIcons from './components';
import { Loop } from './components';

export default {
  title: 'components/Icons',
};

interface IconVariantsProps {
  Icon: ComponentType<SvgIconProps>;
}

const IconVariants: FC<IconVariantsProps> = ({ Icon }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Typography>{Icon.displayName}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid lightgray',
          margin: '10px',
          textAlign: 'center',
          padding: '5px',
        }}
      >
        <Icon />
      </Box>
    </Box>
  );
};

export const Icons: FC = () => {
  const content: ReactNode[] = [];
  forEach(allIcons, (icon, index) => {
    content.push(<IconVariants key={index} Icon={icon} />);
  });
  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr">
        {content}
      </Box>
      <Box>
        <Loop sx={{ color: 'red' }} />
      </Box>
    </>
  );
};
