import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';

import { DateInputComponent } from './date-input.component';

@Component({
  selector: 'c',
  template: `
    <form [formGroup]="form">
      <c-date-input
        name="date"
        formControlName="date">
      </c-date-input>
    </form>
  `
})
class TestComponent {
  public date: FormControl;
  public form: FormGroup;

  constructor(private builder: FormBuilder) {
    this.date = new FormControl('');
    this.form = builder.group({
      date: this.date,
    });
  }
}

describe('DateInputComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: DebugElement;
  const dateFormat = 'DD/MM/YYYY';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ DateInputComponent, TestComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    fixture.detectChanges();
  });

  it('accepts inputs in DD/MM/YYYY format', () => {
    const date = moment('01/01/2001', dateFormat).toDate();
    setViewDateInput(moment(date).format(dateFormat));

    expect(component.date.value).toEqual(date);
    expect(component.form.valid).toBe(true);
  });

  it('does NOT accept inputs in other formats', () => {
    setViewDateInput('01.01.2001');

    expect(component.date.value).toEqual(null);
    expect(component.form.valid).toBe(false);
  });

  function setViewDateInput(value) {
    const el = element.query(By.css('input')).nativeElement;
    el.value = value;
    el.dispatchEvent(new Event('blur'));
  }
});
