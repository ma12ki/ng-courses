import { Observable } from 'rxjs/Observable';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'c-loader',
  styleUrls: [ './loader.component.scss' ],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  public show$: Observable<boolean>;

  constructor(
    private loaderService: LoaderService,
  ) { }

  public ngOnInit() {
    console.log('LoaderComponent init');

    this.show$ = this.loaderService.show$;
  }
}
