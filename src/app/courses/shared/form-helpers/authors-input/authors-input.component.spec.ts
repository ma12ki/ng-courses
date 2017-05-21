import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MdCheckboxModule } from '@angular/material';

import { IAuthor } from '../../author.entity';
import { AuthorsInputComponent } from './authors-input.component';

@Component({
  selector: 'c',
  template: `
    <form [formGroup]="form">
      <c-authors-input
        name="authors"
        [authors]="authors"
        formControlName="selectedAuthors">
      </c-authors-input>
    </form>
  `
})
class TestComponent {
  public selectedAuthors: FormControl;
  public form: FormGroup;
  public authors: IAuthor[];

  constructor(private builder: FormBuilder) {
    this.selectedAuthors = new FormControl([]);
    this.form = builder.group({
      selectedAuthors: this.selectedAuthors,
    });
  }
}

describe('AuthorsInputComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: DebugElement;
  const authors: IAuthor[] = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MdCheckboxModule ],
      declarations: [ AuthorsInputComponent, TestComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.authors = authors;
    element = fixture.debugElement;

    fixture.detectChanges();
  });

  it('toggles all elements ON', () => {
    const expected = authors.map((a) => a.id);
    clickAll();

    expect(component.selectedAuthors.value).toEqual(expected);
  });

  it('toggles all elements OFF', () => {
    const expected = [];
    clickAll();
    clickAll();

    expect(component.selectedAuthors.value).toEqual(expected);
  });

  it('toggles first element ON', () => {
    const index = 0;
    clickOne(index);
    const expected = [authors[index].id];

    expect(component.selectedAuthors.value).toEqual(expected);
  });

  it('toggles last element ON', () => {
    const index = authors.length - 1;
    clickOne(index);
    const expected = [authors[index].id];

    expect(component.selectedAuthors.value).toEqual(expected);
  });

  function clickAll() {
    const els = element.queryAll(By.css('input[type=checkbox]'));
    els.forEach((el) => {
      el.nativeElement.dispatchEvent(new Event('click'));
    });
  }

  function clickOne(index: number) {
    const els = element.queryAll(By.css('input[type=checkbox]'));
    els[index].nativeElement.dispatchEvent(new Event('click'));
  }
});
