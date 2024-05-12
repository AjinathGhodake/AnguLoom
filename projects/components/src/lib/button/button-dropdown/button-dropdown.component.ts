import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ListItemComponent } from '../../list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'loom-button-dropdown',
  standalone: true,
  imports: [CommonModule, IconComponent, CardComponent, OverlayModule],
  templateUrl: './button-dropdown.component.html',
  styleUrl: './button-dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('indicatorRotate', [
      state('false', style({ transform: 'rotate(0deg)' })),
      state('true', style({ transform: 'rotate(180deg)' })),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
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
export class ButtonDropdownComponent
  implements OnChanges, AfterViewInit, OnInit
{
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
  isPanelOpen = false;
  @Output() selectedOption: EventEmitter<any> = new EventEmitter();
  @ContentChildren(forwardRef(() => ListItemComponent))
  QueryListItems!: QueryList<ListItemComponent>;
  listItems!: ListItemComponent[];
  selectedListItems: any[] = [];
  icon!: 'md-chevron-down' | 'md-chevron-down-white';
  subscriptions = new Subscription();
  buttonFocused = false;
  dropdownFocused = false;
  @Input() hover = false;
  @HostListener('click', ['$event'])
  buttonClicked(event: any) {
    this._ripple = !this._ripple;
    this.isPanelOpen = !this.isPanelOpen;
    this.setHostClass();
  }

  @HostListener('mouseenter', ['$event'])
  buttonMouseEnter() {
    // checking the mouse leave on button
    this.buttonFocused = false;
    if (this.hover) {
      this.isPanelOpen = !this.isPanelOpen;
    }
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.setHostClass();
  }

  selectOption(value: any) {
    this.isPanelOpen = false;
    this.setHostClass();
    this.selectedOption.emit(value);
  }

  closeDropdown() {
    this.isPanelOpen = false;
    this.setHostClass();
    this._changeDetectorRef.markForCheck();
  }

  closeOnMouseLeave() {
    if (this.hover) {
      this.isPanelOpen = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  setHostClass() {
    this._hostClass = `button--${this.type} button--${this.size}`;
    this._hostClass += this.disabled ? ` button--disabled` : '';
    if (
      this.type == 'qualified' ||
      this.type == 'disqualified' ||
      this.type == 'active'
    ) {
      this.icon = 'md-chevron-down';
      this._hostClass += this.isPanelOpen ? ` button__body--active` : '';
    } else {
      this.icon = 'md-chevron-down-white';
    }
  }
  ngAfterViewInit() {
    if (
      this.QueryListItems &&
      this.QueryListItems.toArray() &&
      this.QueryListItems.toArray().length > 0
    ) {
      this.listItems = this.QueryListItems.toArray();
      this.listItems.forEach((template) => {
        this.subscriptions.add(
          template.onSelect.subscribe((value) => {
            this.updateList(value);
            this.closeDropdown();
            const selectedTemplateItem = this.listItems.find(
              (obj) => obj.value === value,
            );
            this.selectedOption.emit({
              value: selectedTemplateItem?.value,
              selected: selectedTemplateItem?.selected,
            });
          }),
        );
      });
    }
  }

  updateList(value: any) {
    if (
      this.QueryListItems &&
      this.QueryListItems.toArray() &&
      this.QueryListItems.toArray().length > 0
    ) {
      this.QueryListItems.forEach((template) => {
        if (template.value !== value) {
          template.hostClass = undefined;
          template.selected = false;
        }
      });
    }
  }

  //overlay related variables
  _positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  ngOnInit(): void {
    if (!this._hostClass) {
      this._hostClass = `button--${this.type} button--${this.size}`;
      this.setHostClass();
    }
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.unsubscribe) {
      this.subscriptions.unsubscribe();
    }
  }
}
