import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ManagementService } from './management.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private manageservice: ManagementService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.manageservice.getNavigated()) {
      return true;
    } else {
      this._router.navigate(['/home']);
      return false;
    }
  }
}
