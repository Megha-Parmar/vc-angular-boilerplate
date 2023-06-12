import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { STORAGE } from '@constants/localstorage.constant';
import { StorageService } from '@services/storage.service';

export const LoginGuard: CanMatchFn = (_, segments: UrlSegment[]) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.get(STORAGE.LOGIN_TOKEN);
  let url = '';
  segments?.forEach(segment => {
    url += `${segment.path}/`;
  });

  if (!token || url.includes('logout')) {
    return true;
  }
  router.navigate(['/admin']);
  return false;
};
