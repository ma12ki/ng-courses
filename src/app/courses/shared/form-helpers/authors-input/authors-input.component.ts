import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  Input,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
} from '@angular/forms';

import { IAuthor } from '../../author.entity';

const AUTHORS_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => AuthorsInputComponent),
  multi: true,
};

const AUTHORS_INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => AuthorsInputComponent),
  multi: true,
};

@Component({
  selector: 'c-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: [
    './authors-input.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AUTHORS_INPUT_VALUE_ACCESSOR,
    AUTHORS_INPUT_VALIDATOR,
  ],
})
export class AuthorsInputComponent implements ControlValueAccessor, Validator {
  @Input() public control: FormControl;
  @Input() public authors: IAuthor[];

  private _value: number[] = [];
  private _validationErrors: ValidationErrors;
  private _onChange: Function;
  private _onTouched: Function;
  private _onValidatorChange: Function;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  public get value() {
    return this._value;
  }

  public set value(newValue) {
    const oldValue = [ ...this._value ];
    this._value = newValue || [];

    if (this._isValueChanged(oldValue)) {
      this._emitChange();
    }
  }

  public registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  public validate(c: FormControl): ValidationErrors {
    return this._validationErrors;
  }

  public writeValue(value: number[]): void {
    if (value) {
      this._value = value;
      this.cd.markForCheck();
    }
  }

  public registerOnChange(fn: Function): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    throw new Error('Not implemented yet.');
  }

  public getAuthorId(_index, author: IAuthor): number {
    return author.id;
  }

  public isAuthorSelected(authorId: number, lol = false): boolean {
    return this._value.some((id) => id === authorId);
  }

  public updateSelected(authorId: number, checked: boolean): void {
    if (checked) {
      this.value = [ ...this._value, authorId ].sort((a, b) => a - b);
    } else {
      this.value = this._value.filter((id) => id !== authorId);
    }
  }

  private _isValueChanged(oldValue): boolean {
    return JSON.stringify(oldValue) !== JSON.stringify(this._value);
  }

  private _emitChange(): void {
    if (this._onChange) {
      this._onChange(this._value);
    }
  }

  private _emitValidatorChange(): void {
    if (this._onValidatorChange) {
      this._onValidatorChange(this._validationErrors);
    }
  }

}
