import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'loom-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input() icon!: string;
  @Input() type!: 'inactive' | 'disabled';
  _icon!: string;
  constructor(private _elementRef: ElementRef) {
    // this.type = this.type?this.type:'';
  }

  ngOnChanges(): void {
    this._icon = this.type ? this.icon + '-' + this.type : this.icon;
    const content = this._createIcon() as HTMLElement;
    if (content) {
      if (this._elementRef.nativeElement.children.length) {
        this._elementRef.nativeElement.removeChild(
          this._elementRef.nativeElement.children[0],
        );
      }
      this._elementRef.nativeElement.appendChild(content);
    }
  }
  private _createIcon() {
    try {
      let icon: Node | null = null;
      const iconSplit = this._icon.split(':');
      const iconSetProvided = iconSplit.length > 1;
      const iconSetName = iconSetProvided ? iconSplit.shift() : 'default';
      const iconName = iconSetProvided ? iconSplit.pop() : this._icon;
      const iconSet = document.head.querySelector(
        `template#${iconSetName}`,
      ) as HTMLTemplateElement;
      if (iconSet && iconSet.content && iconName) {
        let selectedIcon = iconSet.content.querySelector(`[name=${iconName}]`);
        selectedIcon = selectedIcon ? selectedIcon.querySelector(`svg`) : null;
        icon = selectedIcon ? selectedIcon.cloneNode(true) : icon;
      }
      return icon;
    } catch (error) {
      return null;
    }
  }
}
