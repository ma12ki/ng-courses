import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'c-toolbar',
  styleUrls: [ './toolbar.component.scss' ],
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();
  public searchTerm: string;

  constructor(
    private router: Router,
  ) {}

  public ngOnInit() {
    console.log('ToolbarComponent init');
  }

  public search() {
    console.log(this.searchTerm);
    this.onSearch.emit(this.searchTerm);
  }

  public goToAddNewCourse(): void {
    this.router.navigate(['/new']);
  }
}
