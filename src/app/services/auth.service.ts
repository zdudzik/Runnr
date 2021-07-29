import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserData>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) 
  {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserData>(`users/${user.uid}`).valueChanges(); //valueChanges converts this to an observable
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
    return this.router.navigate(['/']);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/login']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true }); //set is a destructive method. to prevent overwritting for returning users we have merge true
  }

}

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
}
