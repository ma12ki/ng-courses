import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'c-course-delete-modal',
  templateUrl: './course-delete-modal.component.html'
})
export class CourseDeleteModalComponent {
  constructor(
    private dialogRef: MdDialogRef<CourseDeleteModalComponent>,
  ) { }

  public confirm() {
    this.dialogRef.close(true);
  }

  public cancel() {
    this.dialogRef.close(false);
  }
}
