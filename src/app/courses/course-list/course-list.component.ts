import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ICourse } from '../shared/course.entity';

@Component({
  selector: 'c-course-list',
  styleUrls: [ './course-list.component.scss' ],
  templateUrl: './course-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  @Input() public courses: ICourse[];
  @Output() public deleteCourse = new EventEmitter<number>();

  public reemitDeleteCourse(courseId: number): void {
    this.deleteCourse.emit(courseId);
  }
}
