import { FC, SyntheticEvent } from 'react';
import { UploadFile } from '@mui/icons-material';
import { CardMedia, CardMediaProps } from '@mui/material';
import { pricingBackgroundImage } from 'assets/images';
import { CustomCardMediaProps, Proportions } from 'components/CustomCardMedia/CustomCardMedia.types';
import { COLOR_NEUTRALS_4 } from 'theme/colors';

export const CustomCardMedia: FC<CustomCardMediaProps & CardMediaProps> = ({
  width,
  proportions = Proportions.p1to1,
  src,
  alt = 'nftImage',
  className,
  title,
  ...cardMediaProps
}) => {
  const handleError = (event: SyntheticEvent<HTMLImageElement>): void => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.src = pricingBackgroundImage;
  };

  if (!src) {
    return <UploadFile sx={{ color: COLOR_NEUTRALS_4 }} />;
  }

  return (
    <CardMedia
      sx={{
        maxWidth: width,
        aspectRatio: `${proportions}`,
        ...cardMediaProps.sx,
      }}
      className={className}
      onError={handleError}
      component="img"
      src={src}
      alt={alt}
      title={title}
    />
  );
};
