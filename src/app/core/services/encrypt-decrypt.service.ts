import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptService {
  sessionInitial = 'vc-boilerplate';

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  encryptData(data: any): any {
    return btoa(JSON.stringify(data));
  }

  decryptData(data: any) {
    try {
      const encrypted = atob(data);
      if (encrypted) {
        try {
          return JSON.parse(encrypted);
        } catch (e) {
          return null;
        }
      }
    } catch (err) {
      return null;
    }
  }

  setEncryptedLocalStorage(key: string, data: any) {
    if (data && key) {
      const encryptedString = this.encryptData(data);
      const keyName = this.sessionInitial + '-' + key.trim();
      this.localStorageService.set(keyName, encryptedString);
    }
  }

  getDecryptedLocalStorage(key: string) {
    if (key) {
      const keyName = this.sessionInitial + '-' + key.trim();
      const localStorageData = this.localStorageService.get(keyName);
      if (localStorageData) {
        const decryptedData = this.decryptData(localStorageData);
        if (!decryptedData) {
          this.removeEncryptedLocalStorage(key);
        }
        return decryptedData;
      }
    }
  }

  removeEncryptedLocalStorage(key: string) {
    if (key) {
      const keyName = this.sessionInitial + '-' + key.trim();
      if (this.localStorageService.get(keyName)) {
        this.localStorageService.remove(keyName);
      } else {
        this.localStorageService.remove(key);
      }
    }
  }

  clearAllEncryptedLocalStorage() {
    this.localStorageService.clear();
  }


}
