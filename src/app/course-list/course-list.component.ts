import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-course-list',
  styleUrls: [ './course-list.component.scss' ],
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {
  public courses: Object[];

  public ngOnInit() {
    console.log('CourseListComponent init');

    this.courses = [{}, {}, {}];
  }
}
