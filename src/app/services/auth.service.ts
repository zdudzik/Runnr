import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}
