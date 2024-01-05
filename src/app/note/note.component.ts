import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  editForm!: FormGroup;
  notesData: any = [];
  noteDetails: any;
  noteObj: Note = {
    id: '',
    note_title: 'string',
    note_dec: 'string'
  }


  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      discription: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      edit_title: ['', Validators.required],
      edit_discription: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllNotes()
  }
  //add note
  addNote() {
    const { value } = this.noteForm
    console.log(value);
    this.noteObj.id = '',
      this.noteObj.note_title = value.title,
      this.noteObj.note_dec = value.discription
    this.noteService.addNote(this.noteObj).then((note: any) => {
      if (note) {
        alert("Note Added Sucessfully...")
        this.noteForm.reset();
      }
    })
  }
  // get all note
  getAllNotes() {
    this.noteService.getNotes().subscribe((res: Note[]) => {
      console.log(res);
      this.notesData = res;
    })
  }

  // delete note
  deleteNote(note: Note) {
    let decision = confirm("Are you sure want to delete this note...?")
    if (decision == true) {
      this.noteService.deleteNote(note);
    }
  }
  getAllDetails(note: Note) {
    this.noteDetails = note;
    console.log(this.noteDetails);
  }
  //update note
  updateNote(note: Note) {
    const { value } = this.editForm
    console.log(value);

    (this.noteObj.id = note.id),
             console.log(note.id),
  
   (this.noteObj.note_title = value.edit_title),
            console.log(value.edit_title),
     (this.noteObj.note_dec = value.edit_discription)
           console.log(value.edit_discription),

      this.noteService.updateNote(note, this.noteObj).then(() => {
        alert("Note Updated Sucessfully...")

      })
    this.editForm.reset();
  }

}

