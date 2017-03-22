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
  selector: 'c-course-item',
  styleUrls: [ './course-item.component.scss' ],
  templateUrl: './course-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() public course: ICourse;
  @Output() public deleteCourse = new EventEmitter<number>();

  public onDelete(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
