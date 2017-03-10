import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { ICourse } from './../entities/course';

@Component({
  selector: 'c-course-item',
  styleUrls: [ './course-item.component.scss' ],
  templateUrl: './course-item.component.html'
})
export class CourseItemComponent {
  @Input() public course: ICourse;
}
