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

// public createHero(data: Hero) {
//     this.uploadFile(data.photos, data.uuid)
//       .subscribe(responsesArray => {
//         let success = true;
//         responsesArray.forEach(resp => {
//           console.log(resp);
//           if(resp.state !== "success") {
//             success = false;
//           }
//         })
//         if(success) {
//           this.firestore.collection("heroes").add(data.getJSON()).then(resp => {
//             console.log(resp)
//           }, err => {
//             console.error(err);
//           });
//         } else {
//           console.error("Not all photos is upload");
//         }
//       });
// }
//
// private uploadFile(photos: Array<File>, id: string): Observable<Array<any>> {
//   const photoUploadObs = [];
//   photos.forEach(elem => {
//     const filePath = 'heroesPhotos/' + id + '/' + elem.name;
//     const ref = this.fireStorage.ref(filePath);
//     photoUploadObs.push(ref.put(elem));
//   })
//   return forkJoin(photoUploadObs);
// }

// public getFiles(id: string, filesNames: Array<string>): Observable<any> {
//   const photoGetObs = [];
//   filesNames.forEach(elem => {
//     const ref = this.fireStorage.ref('heroesPhotos/' + id + '/' + elem);
//     let profileUrl = ref.getDownloadURL();
//     photoGetObs.push(profileUrl);
//   })
//   return forkJoin(photoGetObs);
// }
