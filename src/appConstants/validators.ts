export const websiteRegex = /^(http:\/\/|https:\/\/)?([a-z0-9][a-z0-9-]*\.)+[a-z0-9][a-z0-9-]{1,}$/i;
export const instagramRegex = /^(?!http(s)?:\/\/)@?[a-z\d._]{1,}$/i;
export const facebookRegex = /^(?!http(s)?:\/\/)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/;
export const twitterRegex = /^(?!http(s)?:\/\/)@?[a-z\d._]{2,}$/i;
export const discordLinkRegex = /(https?:\/\/)(discord\.(gg|io|me|li|com)|discordapp\.com\/invite)\/.+[a-z]/g;
export const telegramLinkRegex = /(https?:\/\/)(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/;

export const mediumRegex = /^(?!http(s)?:\/\/)@?[a-z\d._]{1,}$/i;
// eslint-disable-next-line
export const siteRegex =
  /((http(s)?):\/\/)[a-z0-9_%-]+(\.[a-z0-9_%-]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9]+=[a-zA-Z0-9]+&?)?$/;
export const onlyNumbersAndLettersRegex = /^[a-zA-Z0-9]+$/g;
