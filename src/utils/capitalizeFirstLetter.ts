const toTitleCaseRegex = /(^\w|\s\w)/g;
export const toTitleCase = (text = '') => text.replace(toTitleCaseRegex, (m) => m.toUpperCase());

export const capitalizeFirstLetter = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';
