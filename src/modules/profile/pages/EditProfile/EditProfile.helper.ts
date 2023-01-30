import { facebookRegex, instagramRegex, siteRegex, twitterRegex } from 'appConstants/validators';
import * as yup from 'yup';

export const socials: {
  name: 'site' | 'instagram' | 'twitter' | 'facebook';
  label: string;
  regex: RegExp;
  placeholder: string;
}[] = [
  {
    name: 'site',
    label: 'Website',
    regex: siteRegex,
    placeholder: 'https://enricocole.com',
  },
  {
    name: 'instagram',
    label: 'Instagram username',
    regex: instagramRegex,
    placeholder: '@enricocole',
  },
  {
    name: 'twitter',
    label: 'Twitter username',
    regex: twitterRegex,
    placeholder: '@enricocole',
  },
  {
    name: 'facebook',
    label: 'Facebook username',
    regex: facebookRegex,
    placeholder: 'enricocole',
  },
];

export const validationSchema = yup.object().shape(
  {
    displayName: yup.string().min(1).max(50).required(),
    email: yup.string().email().max(50),
    bio: yup.string().min(0).max(500),

    ...Object.fromEntries(
      socials.map(({ name, regex }) => [
        name,
        yup.string().when(name, (val) => {
          if (val && val.length > 0) {
            return yup
              .string()
              .matches(regex, `${name} is not valid`)
              .min(2, `${name} must be at least 2 characters`)
              .max(50, 'max 50');
          }
          return yup.string().notRequired();
        }),
      ]),
    ),
  },
  socials.map(({ name }) => [name, name]),
);
