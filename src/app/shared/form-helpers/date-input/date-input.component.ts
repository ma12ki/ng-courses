import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

const DATE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true,
};

@Component({
  selector: 'c-date-input',
  templateUrl: './date-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_INPUT_VALUE_ACCESSOR],
})
export class DateInputComponent implements ControlValueAccessor {
  private _value: Date;
  private _acceptedFormat = 'DD/MM/YYYY';
  private _onChange: Function;
  private _onTouched: Function;

  public get value() {
    return this._value;
  }

  public set value(newValue) {
    const date = moment(newValue, this._acceptedFormat, true);
    const oldValue = this._value ? moment(this._value).toDate() : null;
    if (newValue && date.isValid()) {
      this._value = date.toDate();
    } else {
      this._value = null;
    }
    if (this._isValueChanged(oldValue)) {
      this._emitChange();
    }
  }

  public updateValue(event) {
    this.value = event.target.value;
  }

  public writeValue(value: Date): void {
    if (value !== this.value) {
      this.value = value;
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
}
