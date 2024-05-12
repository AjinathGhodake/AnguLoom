import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'loom-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnChanges, AfterContentChecked {
  @Input() cardType:
    | 'section-card'
    | 'dropdown-card'
    | 'dialogue-card'
    | 'non-radius-card'
    | 'meeting-card'
    | 'activity-card';

  @Input() disabled = false;
  @Input() actionable = false;
  @HostBinding('class') _hostClass: string;
  isTitle = false;

  constructor(private el: ElementRef) {
    this.cardType = 'dialogue-card';
    this._hostClass = this.cardType;
  }
  ngAfterContentChecked(): void {
    this.el.nativeElement.children[0].innerText
      ? (this.isTitle = true)
      : (this.isTitle = false);
  }
  ngOnChanges(): void {
    this._hostClass = this.disabled ? ' disabled' : this.cardType;
    this._hostClass += this.actionable ? ` actionable` : '';
  }
}
