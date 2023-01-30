import { ProfileInfoCardPropsMocked } from 'components/ProfileInfoCard/ProfileInfoCard.mock';

import { ProfileInfoCard } from './ProfileInfoCard';

export default {
  title: 'components/ProfileInfoCard',
  component: ProfileInfoCard,
};

export const Default = () => <ProfileInfoCard {...ProfileInfoCardPropsMocked} />;
