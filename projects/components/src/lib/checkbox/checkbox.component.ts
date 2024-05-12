import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { noop } from 'rxjs';
import { UtilService } from '../services/util.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loom-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges
{
  @Input() isDisable = false;
  @Input() checked = false;
  @Input() checkboxId = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('labelRef') labelRef!: ElementRef;
  labelExists = true;

  constructor(
    private utilService: UtilService,
    private cdRef: ChangeDetectorRef,
  ) {}

  onTouchedCallback: () => void = noop;
  onChange = (_: any) => {
    //
  };

  clickEvent(value: any) {
    this.checked = value.checked;
    this.onClick.emit(this.checked);
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewInit(): void {
    if (document.getElementsByClassName('checkbox__label')) {
      const el = document.getElementsByClassName('checkbox__label')[0];
      if (el) {
        this.labelExists = !!(el as HTMLElement).innerHTML.trim();
        (el as HTMLElement).style.display = this.labelExists ? 'block' : 'none';
      }
    }
  }

  ngOnChanges(): void {
    if (!this.checkboxId) {
      this.checkboxId = 'checkbox-' + this.utilService.randomIdGenerator();
    }
    if (this.isDisable) {
      this.cdRef.detach();
    } else {
      this.cdRef.reattach();
    }
    this.cdRef.detectChanges();
  }
}
