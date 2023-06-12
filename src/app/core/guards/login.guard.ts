import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { LOGOUT } from '@constants/app.constants';
import { STORAGE } from '@constants/localstorage.constant';
import { StorageService } from '@services/storage.service';

export const LoginGuard: CanMatchFn = (_, segments: UrlSegment[]) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.get(STORAGE.LOGIN_TOKEN);

  if (!token || checkRoute(segments, LOGOUT)) {
    return true;
  }
  router.navigate(['/admin']);
  return false;
};

const checkRoute = (segments: UrlSegment[], route: string) => {
  return segments?.some((segment) => segment.path.includes(route));
};
