import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { ICourse } from './../entities/course';

@Component({
  selector: 'c-course-list',
  styleUrls: [ './course-list.component.scss' ],
  templateUrl: './course-list.component.html'
})
export class CourseListComponent {
  @Input() public courses: ICourse[];
}
