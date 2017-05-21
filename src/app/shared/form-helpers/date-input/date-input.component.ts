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
  public viewValue: string;
  public modelValue: Date;
  public acceptedFormat = 'DD/MM/YYYY';
  private _validationErrors: ValidationErrors;
  private _onChange: Function;
  private _onTouched: Function;
  private _onValidatorChange: Function;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  public registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  public validate(c: FormControl): ValidationErrors {
    return this._validationErrors;
  }

  public parseValue(event) {
    this.viewValue = event.target.value;
    const date = moment(this.viewValue, this.acceptedFormat, true);
    const oldViewValue = this.viewValue;
    const oldValidationErrors = this._validationErrors ? { ...this._validationErrors } : null;
    if (this.viewValue && date.isValid()) {
      this.modelValue = date.toDate();
    } else {
      this.modelValue = null;
    }
    this._validationErrors = (this.viewValue && !date.isValid()) ? { invalidFormat: true } : null;

    if (this._isViewValueChanged(oldViewValue)) {
      this._emitChange();
    }
    if (this._areValidationErrorsChanged(oldValidationErrors)) {
      this._emitValidatorChange();
    }
  }

  public writeValue(modelValue: Date): void {
    this.modelValue = modelValue;
    this.viewValue = this.modelValue ? moment(this.modelValue).format(this.acceptedFormat) : null;
    this.cd.markForCheck();
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

  private _isViewValueChanged(oldViewValue): boolean {
    return (oldViewValue === this.viewValue);
  }

  private _emitChange(): void {
    if (this._onChange) {
      this._onChange(this.modelValue);
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
