import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-course-item',
  styleUrls: [ './course-item.component.scss' ],
  templateUrl: './course-item.component.html'
})
export class CourseItemComponent implements OnInit {
  public ngOnInit() {
    console.log('CourseItemComponent init');
  }
}
