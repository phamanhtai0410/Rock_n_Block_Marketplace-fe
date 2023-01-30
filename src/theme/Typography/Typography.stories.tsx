/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Typography } from '@mui/material';

export default {
  title: 'theme/Typography',
  component: Typography,
};

export const Default: React.FC = () => (
  <div>
    <div>
      <Typography variant="h1">H1 heading</Typography>
      <Typography variant="h2">H2 heading</Typography>
      <Typography variant="h3">H3 heading</Typography>
      <Typography variant="h4">H4 heading</Typography>
      <Typography variant="h4" className="h4-medium">
        H4 heading medium
      </Typography>
      <Typography variant="h5">H5 heading</Typography>
    </div>

    <div>
      <Typography variant="body1" display="block">
        Body 1
      </Typography>
      <Typography variant="body1" className="s" display="block">
        Body 1 S
      </Typography>
      <Typography variant="body1" className="m" display="block">
        Body 1 M
      </Typography>
      <Typography variant="body1" className="l" display="block">
        Body 1 L
      </Typography>
      <Typography variant="body1" className="xl green" display="block">
        Body 1 XL
      </Typography>
      <Typography variant="body1" display="block">
        <strong>Body 1 Bold</strong>
      </Typography>
      <Typography variant="body1" display="block">
        <Link>Body 1 Link</Link>
      </Typography>
    </div>
    <div>
      <Typography variant="body2" display="block">
        Body 2
      </Typography>
    </div>
  </div>
);
