import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { AvatarUploader, BackgroundImageCover, Email, Site, Socials, SocialsProps } from 'components';
import { Edit } from 'components/Icon/components';
import { useGetQuery } from 'hooks';
import { COLOR_NEUTRALS_6 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { toTitleCase } from 'utils';

export type GameHeaderProps = {
  chainImg?: string;
  chainName?: string;
  cover?: string;
  socials?: SocialsProps;
  name?: string;
  avatar?: string;
  site?: string;
  email?: string;
  description?: string;
  isAbleToEdit?: boolean;
  gameId: string;
  onDeleteAvatar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onUploadAvatar: (file: File | null) => void;
};

export const GameHeader: FC<GameHeaderProps> = ({
  chainName,
  chainImg,
  cover,
  socials,
  name,
  avatar,
  description,
  site,
  email,
  isAbleToEdit,
  gameId,
  onDeleteAvatar,
  onUploadAvatar,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const currentNetwork = useGetQuery('network');

  const handleEditClick = () => {
    navigate(routes.games.game.editGame.root.getPath(gameId, currentNetwork));
  };
  const handleAddCategoryClick = () => {
    navigate(routes.games.game.addNewCategory.root.getPath(gameId, currentNetwork));
  };

  const textColor = useMemo(() => (cover ? COLOR_NEUTRALS_6 : theme.themeColors.colorTextDefault), [cover, theme]);

  return (
    <BackgroundImageCover
      cover={cover}
      defaultTransparentBanner
      spacing={3}
      direction="column"
      sx={{ paddingTop: { xs: 8.5, sm: 11 } }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <AvatarUploader
          isAbleToEdit={isAbleToEdit}
          avatar={avatar}
          onUploadAvatar={onUploadAvatar}
          onDeleteAvatar={onDeleteAvatar}
          sx={{ button: { color: textColor } }}
        />
        <Typography
          variant="h2"
          color={textColor}
          sx={{
            transform: 'translateY(-10px)',
            fontSize: { xs: '30px', sm: '48px' },
            maxWidth: 700,
            fontWeight: { xs: FontWeights.fontWeightSemiBold, sm: FontWeights.fontWeightBold },
            wordBreak: 'break-all',
          }}
        >
          {toTitleCase(name)}
        </Typography>
      </Stack>
      {site && <Site site={site} sx={{ color: textColor, alignSelf: 'flex-start', width: '100%', maxWidth: 500 }} />}
      {email && (
        <Email email={email} sx={{ color: textColor, alignSelf: 'flex-start', width: '100%', maxWidth: 500 }} />
      )}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography color={textColor}>Blockchain:</Typography>
        <Box component="img" src={chainImg} sx={{ width: 20, height: 20 }} />
        <Typography fontWeight={FontWeights.fontWeightMedium} color={textColor}>
          {chainName}
        </Typography>
      </Stack>
      <Socials {...socials} />
      <Typography className="s" color={textColor} sx={{ maxWidth: 525 }}>
        {description}
      </Typography>
      {isAbleToEdit && (
        <Stack
          spacing={{ xs: 3, sm: 0 }}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ width: '100%', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
        >
          <Button onClick={handleEditClick} variant="contained" color="secondary" size="small" endIcon={<Edit />}>
            Edit info
          </Button>
          <Button onClick={handleAddCategoryClick} size="small" sx={{ width: { xs: '100%', sm: 'fit-content' } }}>
            Add new category
          </Button>
        </Stack>
      )}
    </BackgroundImageCover>
  );
};
