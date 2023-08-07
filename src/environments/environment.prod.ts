import npm from '../../package.json';

export const environment = {
  production: true,
  encryptedKey: process.env.ENCRYPTED_KEY as string,
  version: npm.version,
  hostName: 'https://vc-nest-js-boilerplate.vercel.app',
  restAPI: '/api/',
  preferredCountries: ['ch', 'de', 'fr', 'gb', 'it', 'nl', 'fi'],
};
