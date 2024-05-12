import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'loom-list-item',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent],
  providers: [UtilService],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnChanges {
  @Input() nonClickable = false;
  @Input() selected = false;
  @Input() value = '';
  @Input() multiSelect = false;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content', { read: ElementRef, static: true })
  content!: ElementRef;
  @HostBinding('class') hostClass!:
    | 'active'
    | 'list__metadata-container'
    | 'active list__metadata-container'
    | 'non-clickable'
    | undefined;
  id = '';
  isMetadata = false;

  @ViewChild('label', { read: ElementRef, static: true })
  listTextRef!: ElementRef;
  listItemText!: string;

  constructor(public _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.hostClass = this.selected && !this.multiSelect ? 'active' : undefined;
    if (this.content.nativeElement.innerHTML) {
      this.isMetadata = true;
      this.hostClass = this.selected
        ? 'active list__metadata-container'
        : 'list__metadata-container';
    }
    if (this.multiSelect) {
      this.id = this.randomIdGenerator();
    }
    if (this.listTextRef) {
      this.listItemText = this.listTextRef.nativeElement.innerText;
    }
    if (this.nonClickable) {
      this.hostClass = 'non-clickable';
    }
  }

  ngAfterViewInit() {
    if (this.listTextRef) {
      this.listItemText = this.listTextRef.nativeElement.innerText;
    }
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.value = this.listTextRef.nativeElement.innerText;
    this.selected = !this.selected;
    this.hostClass = this.selected ? 'active' : undefined;
    this.onSelect.emit(this.value);
  }

  randomIdGenerator() {
    return (
      'checkbox-' +
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    );
  }
}
