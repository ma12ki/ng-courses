import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CourseDurationPipe } from '../../course-helpers/course-duration.pipe';
import { DurationInputComponent } from './duration-input.component';

@Component({
  selector: 'c',
  template: `
    <form [formGroup]="form">
      <c-duration-input
        name="duration"
        formControlName="duration">
      </c-duration-input>
    </form>
  `
})
class TestComponent {
  public duration: FormControl;
  public form: FormGroup;

  constructor(private builder: FormBuilder) {
    this.duration = new FormControl('');
    this.form = builder.group({
      duration: this.duration,
    });
  }
}

describe('DurationInputComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        CourseDurationPipe,
        DurationInputComponent,
        TestComponent,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    fixture.detectChanges();
  });

  it('accepts positive integers', () => {
    const value = 11;
    setViewDateInput(value);

    expect(component.duration.value).toEqual(value);
    expect(component.form.valid).toBe(true);
  });

  it('does NOT accept negative integers', () => {
    const value = -11;
    setViewDateInput(value);

    expect(component.duration.value).toEqual(null);
    expect(component.duration.errors.invalidNumber).toBe(true);
    expect(component.form.valid).toBe(false);
  });

  it('does NOT accept decimals', () => {
    const value = 1.1;
    setViewDateInput(value);

    expect(component.duration.value).toEqual(null);
    expect(component.duration.errors.invalidNumber).toBe(true);
    expect(component.form.valid).toBe(false);
  });

  it('does NOT accept strings', () => {
    const value = 'eleven';
    setViewDateInput(value);

    expect(component.duration.value).toEqual(null);
  });

  function setViewDateInput(value) {
    const el = element.query(By.css('input')).nativeElement;
    el.value = value;
    el.dispatchEvent(new Event('blur'));
  }
});
