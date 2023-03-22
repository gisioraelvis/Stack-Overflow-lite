import { ISiteAnalytics } from '../shared/interfaces/IAnalytics';
import { IUserState } from '../shared/interfaces/IUser';

export interface AppState {
  user: IUserState;
  siteAnalytics: ISiteAnalytics
}
