import { routes } from 'appConstants';

export const footerLinks = [
  {
    id: 1,
    title: 'Useful Links',
    links: [
      { text: 'Create NFT', link: '/create' },
      { text: 'Explore', link: '/explore' },
      { text: 'My profile', link: (id: string) => routes.profile.root.getPath(Number(id)) },
    ],
  },
  {
    id: 2,
    title: 'Community',
    links: [
      { text: 'FAQ', link: '#' },
      { text: 'How it works', isAnchor: true, link: '/#howItWorks' },
      { text: 'Blog', link: 'https://blog.katanainu.com/blog/' },
      { text: 'Coinmarketcap', link: 'https://coinmarketcap.com/currencies/katana-inu/' },
    ],
  },
];

export const termsItems = [
  {
    id: 1,
    title: 'Privacy Policy',
    link: 'https://katanainu.com/Katanainuprivacy.pdf',
  },
  {
    id: 2,
    title: 'Terms of Service',
    link: '/terms-of-service',
  },
];

export const footerSocialLinks = {
  facebook: 'https://www.facebook.com/Katanainu-104918325117822',
  twitter: 'https://twitter.com/katanainu',
  linkedIn: 'https://www.linkedin.com/company/74030427/',
};
