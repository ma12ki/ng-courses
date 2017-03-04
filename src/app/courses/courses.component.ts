import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-courses',
  styleUrls: [ './courses.component.scss' ],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  public ngOnInit() {
    console.log('CoursesComponent init');
  }
}
