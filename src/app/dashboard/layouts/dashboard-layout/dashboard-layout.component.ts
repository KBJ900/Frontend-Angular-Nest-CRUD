import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StudentService, Student } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentModalComponent } from 'src/app/student-modal/student-modal.component';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

  // get user() {
  //   return this.authService.currentUser();
  // }

  onLogout() {
    this.authService.logout();
  }

  displayedColumns: string[] = ['id', 'name', 'age', 'actions'];
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  openModal(student?: Student): void {
    const dialogRef = this.dialog.open(StudentModalComponent, {
      data: { student }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStudents();
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
