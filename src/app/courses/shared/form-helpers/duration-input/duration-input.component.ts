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

const DURATION_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => DurationInputComponent),
  multi: true,
};

const DURATION_INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => DurationInputComponent),
  multi: true,
};

@Component({
  selector: 'c-duration-input',
  templateUrl: './duration-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DURATION_INPUT_VALUE_ACCESSOR,
    DURATION_INPUT_VALIDATOR,
  ],
})
export class DurationInputComponent implements ControlValueAccessor, Validator {
  @Input() public control: FormControl;

  public viewValue: string;
  public modelValue: number;
  private _validationErrors: ValidationErrors;
  private _onChange: Function;
  private _onTouched: Function;
  private _onValidatorChange: Function;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  public parseValue(event) {
    const oldViewValue = this.viewValue;
    this.viewValue = event.target.value;
    const newModelValue = +this.viewValue;
    const valid = newModelValue && newModelValue > 0 &&
      (Math.floor(newModelValue) === newModelValue);
    const oldValidationErrors = this._validationErrors ? { ...this._validationErrors } : null;
    if (this.viewValue && valid) {
      this.modelValue = newModelValue;
    } else {
      this.modelValue = null;
    }
    this._validationErrors = (newModelValue && !valid) ? { invalidNumber: true } : null;

    if (this._isViewValueChanged(oldViewValue)) {
      this._emitChange();
    }
    if (this._areValidationErrorsChanged(oldValidationErrors)) {
      this._emitValidatorChange();
    }
  }

  public writeValue(modelValue: number): void {
    this.modelValue = modelValue;
    this.viewValue = this.modelValue ? '' + this.modelValue : null;
    this.cd.markForCheck();
  }

  public registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  public validate(c: FormControl): ValidationErrors {
    return this._validationErrors;
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
    return oldViewValue !== this.viewValue;
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
