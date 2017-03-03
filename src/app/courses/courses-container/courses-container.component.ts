import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-container',
  styleUrls: [ ],
  templateUrl: './courses-container.component.html'
})
export class CoursesContainerComponent implements OnInit {
  public ngOnInit() {
    console.log('CoursesContainerComponent init');
  }
}
