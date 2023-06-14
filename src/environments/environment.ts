import npm from '../../package.json';

export const environment = {
  production: false,
  encryptedKey: process.env.ENCRYPTED_KEY as string,
  version: npm.version,
  baseUrl: 'http://localhost:4200',
  hostName: 'https://card-api-dev.calopad.com',
  restAPI: '/api/',
  preferredCountries: ['ch', 'de', 'fr', 'gb', 'it', 'nl', 'fi'],
};
