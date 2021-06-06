import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Rate} from '../models/rate.model';
import {Subscribable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) {
  }

  public createDocument(data: Rate, collectionName: string): void {
    this.firestore.collection(collectionName).add(data).then(resp => {
      console.log(resp);
    }, err => {
      console.error(err);
    });
  }

  public getDocuments(collectionName: string): Subscribable<any> {
    return this.firestore.collection(collectionName).snapshotChanges();
  }

  public updateDocument(id: string, newDate: Rate, collectionName: string): Promise<any> {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .set(newDate, {merge: true});
  }


  public deleteDocument(data, collectionName: string): Promise<any> {
    return this.firestore
      .collection(collectionName)
      .doc(data.payload.doc.id)
      .delete();
  }

}

