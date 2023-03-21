import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactive: () => Promise<boolean> | Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactiveService
  implements CanDeactivate<CanDeactivateComponent>
{
  constructor() {}
  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return component.canDeactive();
  }
}
