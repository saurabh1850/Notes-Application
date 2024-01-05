import { Injectable } from '@angular/core';
import { Note } from './note';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }

  // Code for Add new note

  addNote(note: Note): any {
    note.id = doc(collection(this.fs, 'id')).id

    return addDoc(collection(this.fs, 'Notes'), note)

  }

  //get all notes from database firebase
  getNotes(): Observable<Note[]> {
    let noteRef = collection(this.fs, 'Notes')
    return collectionData(noteRef, { idField: 'id' }) as Observable<Note[]>
  }

  //delete notes from database
  deleteNote(note: Note) {
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return deleteDoc(docRef)
  }

  // update notes from database
  updateNote(note: Note, notes: any) {
    //let docRef = doc(this.fs, `Notes/${note.id}`);
    note.id = doc(collection(this.fs, 'id')).id
    let docRef = doc(this.fs, `Notes/${note.id}`);
    // console.log(note.id)
    // console.log()
    return updateDoc(docRef, notes)
  }

 

}
