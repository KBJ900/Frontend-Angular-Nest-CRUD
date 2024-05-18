import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService, Student } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
})
export class StudentModalComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student },
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      name: [data.student?.name || '', Validators.required],
      age: [data.student?.age || '', [Validators.required, Validators.min(1)]],
    });
  }

  save(): void {
    if (this.studentForm.valid) {
      if (this.data.student) {
        this.studentService
          .updateStudent(this.data.student.id, this.studentForm.value)
          .subscribe(() => this.dialogRef.close());
      } else {
        this.studentService
          .createStudent(this.studentForm.value)
          .subscribe(() => this.dialogRef.close());
      }
    }
  }
}
