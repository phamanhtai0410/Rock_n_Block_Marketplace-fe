import { IFormInputs } from '../../CollectionContainer';

export type socialMediaFormFieldsType = {
  id: string;
  name: keyof Pick<IFormInputs['socials'], 'site' | 'twitter' | 'telegram' | 'instagram' | 'discord' | 'medium'>;
  label: string;
  placeholder: string;
};

export const socialMediaFormFields: socialMediaFormFieldsType[] = [
  {
    id: 'site',
    name: 'site',
    label: 'site',
    placeholder: 'https://enricocole.com',
  },
  {
    id: 'twitter',
    name: 'twitter',
    label: 'Twitter username',
    placeholder: '@enricocole',
  },
  {
    id: 'telegram',
    name: 'telegram',
    label: 'Telegram',
    placeholder: 'https://t.me/enricocole/',
  },
  {
    id: 'instagram',
    label: 'instagram username',
    name: 'instagram',
    placeholder: '@enricocole',
  },
  {
    id: 'discord',
    label: 'Discord',
    name: 'discord',
    placeholder: 'https://discord.com/channels/enricocole',
  },
  {
    id: 'medium',
    label: 'Medium username',
    name: 'medium',
    placeholder: '@enricocole',
  },
];
