import { IListFormInputs } from 'modules/games/containers/ListGameForm/ListGame.types';
import { socialsValidation } from 'modules/layout/containers';
import { isAddress } from 'utils';
import * as Yup from 'yup';

export const formDefaultValues: IListFormInputs = {
  name: '',
  email: '',
  network: '',
  whitepaperLink: '',
  description: '',
  site: '',
  twitter: '',
  telegram: '',
  instagram: '',
  discord: '',
  medium: '',
  categories: [{ name: '', subcategories: [{ name: '', addresses: [{ address: '' }] }] }],
};

export const validationSchema = socialsValidation.concat(
  Yup.object().shape(
    {
      name: Yup.string().min(1).max(50).required('Name is required field'),
      email: Yup.string().email().max(50).required('Email is required field'),
      network: Yup.string().min(1).required('Blockchain is a required field'),
      whitepaperLink: Yup.string().when('whitepaperLink', (val) => {
        if (val && val.length > 0) {
          return Yup.string()
            .min(10, 'whitepaper link must be at least 10 characters')
            .max(150, 'max length 150 symbols')
            .required('Required');
        }
        return Yup.string().notRequired();
      }),
      categories: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().min(1, 'must be at least 1 characters').max(50, 'max 50').required('Enter valid name'),
            subcategories: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().min(1, 'must be at least 1 characters').required(),
                addresses: Yup.array().of(
                  Yup.object().shape({
                    address: Yup.mixed().test('Address validation', 'Invalid address', (address) => isAddress(address)),
                  }),
                ),
              }),
            ),
          }),
        )
        .required(),
    },
    [['whitepaperLink', 'whitepaperLink']],
  ),
);
