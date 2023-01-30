import {
  discordLinkRegex,
  instagramRegex,
  mediumRegex,
  siteRegex,
  telegramLinkRegex,
  twitterRegex,
} from 'appConstants/validators';
import * as yup from 'yup';

export const socials: { name: 'site' | 'instagram' | 'twitter' | 'discord' | 'medium' | 'telegram'; regex: RegExp }[] =
  [
    {
      name: 'site',
      regex: siteRegex,
    },
    {
      name: 'instagram',
      regex: instagramRegex,
    },
    {
      name: 'twitter',
      regex: twitterRegex,
    },
    {
      name: 'discord',
      regex: discordLinkRegex,
    },
    {
      name: 'telegram',
      regex: telegramLinkRegex,
    },
    {
      name: 'medium',
      regex: mediumRegex,
    },
  ];
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export const socialsValidation = yup.object().shape(
  {
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

type ValidationSchemaProps = {
  maxRoyalty: number;
  isAddToGame?: boolean;
};

export const validationSchema = ({ maxRoyalty, isAddToGame = false }: ValidationSchemaProps) =>
  yup.object().shape(
    {
      name: yup.string().min(1).max(100).required(),
      avatar: yup.mixed().required('Logo Required'),
      symbol: yup.string().min(1).max(30).required(),
      description: yup.string().when('description', (val) => {
        if (val && val.length > 0) {
          return yup
            .string()
            .min(2, 'name must be at least 2 characters')
            .max(500, 'max length 500 symbols')
            .required('Required');
        }
        return yup.string().notRequired();
      }),
      gameSubcategoryId: isAddToGame ? yup.string().min(1).required('Field is required') : yup.string(),
      creatorRoyalty: yup
        .number()
        .typeError('royalty must be a number')
        .nullable()
        .moreThan(-1, 'Floor area cannot be negative')
        .max(maxRoyalty)
        .label('Creator Royalty')
        .test('maxDigitsAfterDecimal', 'Must be exactly 5 characters', (val) =>
          val ? patternTwoDigisAfterComma.test(String(val)) : true,
        )
        .transform((_, val) => (val !== '' ? Number(val) : 0)),
      socials: socialsValidation,
    },
    [['description', 'description']],
  );
