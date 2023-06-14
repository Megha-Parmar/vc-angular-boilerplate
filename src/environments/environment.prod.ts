import npm from '../../package.json';

export const environment = {
  production: true,
  encryptedKey: process.env.ENCRYPTED_KEY as string,
  version: npm.version,
  baseUrl: 'https://cards.calopad.com',
  hostName: 'https://card-api.calopad.com',
  restAPI: '/api/',
  preferredCountries: ['ch', 'de', 'fr', 'gb', 'it', 'nl', 'fi'],
};
