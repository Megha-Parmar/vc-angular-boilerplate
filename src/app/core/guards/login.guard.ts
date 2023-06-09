import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { STORAGE } from '@constants/localstorage.constant';
import { StorageService } from '@services/storage.service';

export const LoginGuard: CanMatchFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.get(STORAGE.LOGIN_TOKEN);
  if (!token) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
