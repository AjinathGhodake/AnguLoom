import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'loom-button-default',
  standalone: true,
  imports: [],
  templateUrl: './button-default.component.html',
  styleUrl: './button-default.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rippleAnimation', [
      state(
        'true',
        style({
          opacity: 0,
        }),
      ),
      state('false', style({ opacity: 0 })),
      transition(
        'true <=> false',

        animate(
          '300ms',

          keyframes([
            style({
              transform: 'scale(0)',
            }),
            style({
              transform: 'scale(1)',
              opacity: '0.1',
            }),
            style({
              transform: 'scale(1.6)',
              opacity: '0',
            }),
          ]),
        ),
      ),
    ]),
  ],
})
export class ButtonDefaultComponent implements OnChanges, OnInit {
  @Input() type:
    | 'primary-default'
    | 'primary-alert'
    | 'primary-calling'
    | 'primary-proceed'
    | 'secondary'
    | 'tertiary'
    | 'qualified'
    | 'active'
    | 'disqualified' = 'primary-default';
  @Input() size: 'xs' | 's' | 'm' | 'l' = 'l';
  @Input() disabled = false;
  @HostBinding('class') _hostClass!: string;
  _ripple = false;

  @HostListener('click')
  buttonClicked() {
    this._ripple = !this._ripple;
  }

  ngOnChanges(): void {
    this._hostClass = `button--${this.type} button--${this.size}`;
    this._hostClass += this.disabled ? ` button--disabled` : '';
  }

  ngOnInit(): void {
    if (!this._hostClass) {
      this._hostClass = `button--${this.type} button--${this.size}`;
    }
  }
}
