import {Injectable} from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService, UserData } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUser: UserData;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {
    this.afAuth.authState.subscribe(user => this.currentUser = user);
  }

  getAllPosts(): Observable<any> {
    return this.afs.collection<any>('posts', ref => ref.orderBy('time', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            };
          });
        })
      );
  }

  postMessage(message: string, ownerName: string, otherItem): void {
    this.afs.collection('posts').add({
      message,
      title: ownerName,
      user_id: this.currentUser.uid,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      ...otherItem
    }).then(res => console.log(res));
  }


}
