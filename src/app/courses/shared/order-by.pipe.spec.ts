import { DebugElement } from '@angular/core/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { OrderByPipe } from './order-by.pipe';

@Component({
  selector: 'c',
  template: `
    <a *ngFor="let item of items | cOrderBy:'a'">
      {{ item.a }}
    </a>
  `
})
class OrderByTestComponent {
  public items: any[];
}

describe('order-by pipe', () => {
  describe('outside Angular', () => {
    let pipe: OrderByPipe;

    beforeEach(() => {
      pipe = new OrderByPipe();
    });

    it('sorts items by given attr', () => {
      const items = [
        { a: 5, b: 4 },
        { a: 1, b: 2 },
        { a: 3, b: 6 },
      ];
      const expected = [
        { a: 1, b: 2 },
        { a: 3, b: 6 },
        { a: 5, b: 4 },
      ];

      const actual = pipe.transform(items, 'a');

      expect(actual).toEqual(expected);
    });
  });

  describe('inside Angular', () => {
    let fixture: ComponentFixture<OrderByTestComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ OrderByPipe, OrderByTestComponent]
      });

      fixture = TestBed.createComponent(OrderByTestComponent);
    });

    it('sorts items in template', () => {
      const items = [
        { a: 5, b: 4 },
        { a: 1, b: 2 },
        { a: 3, b: 6 },
      ];
      const expected = [
        '1',
        '3',
        '5',
      ];

      fixture.componentInstance.items = items;

      fixture.detectChanges();

      const actual = fixture.debugElement.queryAll(By.css('a'))
        .map((el) => el.nativeElement.textContent.replace(/\s/g, ''));

      expect(actual).toEqual(expected);
    });
  });
});
