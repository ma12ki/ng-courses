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
  selector: 'c-course-edit',
  styleUrls: [ './course-edit.component.scss' ],
  templateUrl: './course-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditComponent {

}
