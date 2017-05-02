import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div style="text-align: center">
      <h1>Congratulations, you have found the secret page!</h1>
      <h3>Here, have a cake as a reward:</h3>
      <md-icon style="width: 60px; height: 60px; font-size: 60px">cake</md-icon>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent {

}
