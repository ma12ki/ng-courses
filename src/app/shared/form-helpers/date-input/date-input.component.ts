import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
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
import * as moment from 'moment';

const DATE_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => DateInputComponent),
  multi: true,
};

const DATE_INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => DateInputComponent),
  multi: true,
};

@Component({
  selector: 'c-date-input',
  templateUrl: './date-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DATE_INPUT_VALUE_ACCESSOR,
    DATE_INPUT_VALIDATOR,
  ],
})
export class DateInputComponent implements ControlValueAccessor, Validator {
  @Input() public control: FormControl;

  private _value: Date;
  private _validationErrors: ValidationErrors;
  private _acceptedFormat = 'DD/MM/YYYY';
  private _onChange: Function;
  private _onTouched: Function;
  private _onValidatorChange: Function;

  public get value() {
    return this._value;
  }

  public set value(newValue) {
    const date = moment(newValue, this._acceptedFormat, true);
    const oldValue = this._value ? moment(this._value).toDate() : null;
    const oldValidationErrors = this._validationErrors ? { ...this._validationErrors } : null;
    if (newValue && date.isValid()) {
      this._value = date.toDate();
    } else {
      this._value = null;
    }
    this._validationErrors = (newValue && !date.isValid()) ? { invalidFormat: true } : null;

    if (this._isValueChanged(oldValue)) {
      this._emitChange();
    }
    if (this._areValidationErrorsChanged(oldValidationErrors)) {
      this._emitValidatorChange();
    }
  }

  public registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  public validate(c: FormControl): ValidationErrors {
    return this._validationErrors;
  }

  public updateValue(event) {
    this.value = event.target.value;
  }

  public writeValue(value: Date): void {
    this._value = value;
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

  private _isValueChanged(oldValue): boolean {
    return (
      (!oldValue && !!this._value) ||
      (!!oldValue && !this._value) ||
      (!moment(oldValue).isSame(this._value))
    );
  }

  private _emitChange(): void {
    if (this._onChange) {
      this._onChange(this._value);
    }
  }

  private _areValidationErrorsChanged(oldValidationErrors): boolean {
    return JSON.stringify(oldValidationErrors) !== JSON.stringify(this._validationErrors);
  }

  private _emitValidatorChange(): void {
    if (this._onValidatorChange) {
      this._onValidatorChange(this._validationErrors);
    }
  }

}
