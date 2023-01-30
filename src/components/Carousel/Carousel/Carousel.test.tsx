/* eslint-disable react/no-array-index-key */
import { Box } from '@mui/material';
import { render, screen } from '@testing-library/react';

import { Carousel } from './Carousel';

const setup = () =>
  render(
    <Carousel header={<>New in store</>}>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <Box key={index + 1}>{index + 1}</Box>
        ))}
    </Carousel>,
  );

describe.skip('Carousel', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
