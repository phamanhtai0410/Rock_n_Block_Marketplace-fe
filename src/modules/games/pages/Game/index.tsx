/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, MenuItem, useTheme } from '@mui/material';
import { ITEMS_PER_PAGE_8, routes } from 'appConstants';
import { BackgroundImageCover } from 'components';
import { EditCover } from 'components/EditCover';
import { GridContainer } from 'components/GridContainer';
import { Edit, ImageIcon, Trash } from 'components/Icon/components';
import { useGetQuery, useModal, useShallowSelector, useUnmountEffect } from 'hooks';
import { CategoryCard, GameHeaderSkeleton } from 'modules/games/components';
import { CardVariantText } from 'modules/games/components/CategoryCard/CategoryCard.types';
import { CategoryMenuButton, MenuItemButton } from 'modules/games/components/CategoryCard/components';
import { CategoryCardSkeleton } from 'modules/games/components/CategoryCardSkeleton';
import { DeleteItemProps, DeleteSubcategoryModal } from 'modules/games/pages/Category/components';
import { backgroundCardColor } from 'modules/games/pages/EditGame/EditGame.helper';
import { GameHeader } from 'modules/games/pages/Game/components';
import { convertToFormRequestData } from 'modules/games/pages/Game/Game.helper';
import { currentChains } from 'services/WalletService/config';
import { deleteCategory, getGame, updateGame } from 'store/games/actions';
import gamesActionTypes from 'store/games/actionTypes';
import { clearGame } from 'store/games/reducer';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { RequestStatus } from 'types';
import { fillArray } from 'utils';

interface Params {
  id: string;
  network?: string;
}

export const Game = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { id: gameName } = useParams<keyof Params>() as Params;
  const network = useGetQuery('network');

  const [categoryOnDelete, setCategoryOnDelete] = useState<DeleteItemProps>({ id: 0, name: '' });
  const [isDeleteModalOpen, setDeleteModalOpen, setDeleteModalClose] = useModal(false);

  const {
    user: { id: userId },
  } = useShallowSelector(userSelector.getUser);
  const { [gamesActionTypes.GET_GAME]: getGameDataRequestStatus } = useShallowSelector(uiSelector.getUI);

  const isGameDataLoading = getGameDataRequestStatus === RequestStatus.REQUEST;

  const { game } = useShallowSelector(gamesSelectors.getGames);
  const {
    avatar,
    banner,
    name,
    email,
    description,
    facebook,
    discord,
    categories,
    instagram,
    network: currentNetwork,
    user,
    twitter,
    medium,
    website,
    telegram,
    backgroundColor,
  } = game ?? {};

  const isAbleToEdit = useMemo(() => String(user?.id) === String(userId), [userId, user?.id]);
  const currentChain = useMemo(
    () => currentChains.find((item) => item.id === currentNetwork?.name),
    [currentNetwork?.name],
  );

  const cardBackgroundVariant = useMemo(
    () => (backgroundColor ? backgroundCardColor[backgroundColor] : theme.themeColors.colorCardBackground),
    [backgroundColor],
  );

  const handleOpenDeleteModal = ({ id, name: nameToDelete }: DeleteItemProps) => {
    if (id) {
      setDeleteModalOpen();
      setCategoryOnDelete({ id, name: nameToDelete });
    }
  };

  const handleDeleteCategory = useCallback(
    (id?: number | string) => {
      if (id) {
        dispatch(deleteCategory({ id, params: { gameName, network } }));
      }
    },
    [dispatch, gameName, network],
  );

  const handleChangeCover = useCallback(
    (file: File) => {
      const formData = convertToFormRequestData('banner', { banner: file });

      dispatch(updateGame({ gameName, data: formData, network }));
    },
    [dispatch, gameName],
  );
  const handleDeleteCover = useCallback(() => {
    dispatch(updateGame({ gameName, data: { removeBanner: true }, network }));
  }, [dispatch, gameName]);

  const handleDeleteAvatar = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(updateGame({ gameName, data: { removeAvatar: true }, network }));
    },
    [dispatch, avatar],
  );

  const handleUploadAvatar = useCallback(
    (file: File | null) => {
      const formData = convertToFormRequestData('avatar', { avatar: file });
      dispatch(updateGame({ gameName, data: formData, network }));
    },
    [dispatch, avatar],
  );

  useEffect(() => {
    dispatch(getGame({ gameName, network }));
  }, [dispatch, gameName]);

  useUnmountEffect(() => dispatch(clearGame()));

  return (
    <>
      <BackgroundImageCover isPlainBackgroundColor backgroundColor={backgroundColor} sx={{ zIndex: '10', flex: 1 }}>
        <Box
          sx={{
            position: 'relative',
            zIndex: '10',
          }}
        >
          {isAbleToEdit && (
            <EditCover
              variantBtn="text"
              variant="contained"
              color="secondary"
              onDeleteCover={handleDeleteCover}
              onUpdateCover={handleChangeCover}
              endIcon={<ImageIcon />}
              sx={{
                position: 'absolute',
                top: 0,
                right: { xs: '50%', sm: '0' },
                transform: { xs: 'translateX(50%)', sm: 'translateY(calc(-100% - 60px))' },
                zIndex: 10,
              }}
            />
          )}

          {isGameDataLoading ? (
            <GameHeaderSkeleton />
          ) : (
            <GameHeader
              chainImg={currentChain?.img}
              cover={banner}
              chainName={currentChain?.name}
              gameId={gameName}
              avatar={avatar}
              name={name}
              email={email}
              site={website}
              socials={{ discord, twitter, instagram, telegram, medium, facebook }}
              description={description}
              isAbleToEdit={isAbleToEdit}
              onDeleteAvatar={handleDeleteAvatar}
              onUploadAvatar={handleUploadAvatar}
            />
          )}

          <GridContainer columns={3} spacing={3} mt={5} sx={{ mb: 0, pb: 4 }}>
            {isGameDataLoading
              ? fillArray(ITEMS_PER_PAGE_8).map((_, index) => <CategoryCardSkeleton key={index} />)
              : categories?.map(({ name: categoryName, avatar: categoryAvatar, id }) => (
                  <CategoryCard
                    isAbleToEdit={isAbleToEdit}
                    name={categoryName || ''}
                    media={categoryAvatar || ''}
                    key={categoryName}
                    backgroundColor={cardBackgroundVariant}
                    path={routes.games.game.category.root.getPath({
                      gameId: gameName,
                      categoryId: String(categoryName),
                      network,
                    })}
                  >
                    <CategoryMenuButton>
                      <MenuItem sx={{ px: 1.25 }}>
                        <MenuItemButton
                          component={Link}
                          to={routes.games.game.editCategory.root.getPath({
                            gameName,
                            categoryName: String(categoryName),
                            network,
                          })}
                          startIcon={<Edit />}
                          variant="text"
                        >
                          Edit info
                        </MenuItemButton>
                      </MenuItem>
                      <MenuItem sx={{ px: 1.25 }}>
                        <MenuItemButton
                          onClick={() => handleOpenDeleteModal({ id: id || 0, name: categoryName || '' })}
                          startIcon={<Trash sx={{ fill: 'none', width: 16, height: 16 }} />}
                          variant="text"
                        >
                          {CardVariantText.category}
                        </MenuItemButton>
                      </MenuItem>
                    </CategoryMenuButton>
                  </CategoryCard>
                ))}
          </GridContainer>
        </Box>
      </BackgroundImageCover>
      {isDeleteModalOpen && (
        <DeleteSubcategoryModal
          open={isDeleteModalOpen}
          deletedItemProps={categoryOnDelete}
          onClose={setDeleteModalClose}
          onDelete={handleDeleteCategory}
        />
      )}
    </>
  );
};
