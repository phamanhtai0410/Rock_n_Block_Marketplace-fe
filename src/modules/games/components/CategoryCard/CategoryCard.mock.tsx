import { CategoryCardProps } from 'modules/games/components/CategoryCard/CategoryCard';

export const categoryCardMock: CategoryCardProps = {
  name: 'Weapons',
  media: 'https://images.alphacoders.com/522/522959.jpg',
  isAbleToEdit: true,
  path: '/games/game/1/category/2',
};

export const subcategoryCardMock = {
  getUniqId: (id) => id + 1,
  gameId: 2,
  name: 'Weapons',
  media: 'https://images.alphacoders.com/522/522959.jpg',
  isAbleToEdit: true,
  id: '1',
  path: '/games/game/1/category/2/subcategory/3',
};
