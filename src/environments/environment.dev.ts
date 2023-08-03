import npm from '../../package.json';

export const environment = {
  production: false,
  encryptedKey: process.env.ENCRYPTED_KEY as string,
  version: npm.version,
  baseUrl: 'https://cards.calopad.com',
  // hostName: 'https://card-api-dev.calopad.com',
  // hostName: 'http://localhost:3000',
  hostName: 'https://vc-nest-js-boilerplate.vercel.app',
  restAPI: '/api/',
  preferredCountries: ['ch', 'de', 'fr', 'gb', 'it', 'nl', 'fi'],
};
