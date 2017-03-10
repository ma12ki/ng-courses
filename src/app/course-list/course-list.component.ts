import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ICourse } from './../entities/course';

@Component({
  selector: 'c-course-list',
  styleUrls: [ './course-list.component.scss' ],
  templateUrl: './course-list.component.html'
})
export class CourseListComponent {
  @Input() public courses: ICourse[];
  @Output() public deleteCourse = new EventEmitter<number>();

  public reemitDeleteCourse(courseId: number): void {
    this.deleteCourse.emit(courseId);
  }
}
