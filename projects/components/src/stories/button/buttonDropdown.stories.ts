import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { fn } from '@storybook/test';
import { ButtonDropdownComponent } from '../../lib/button/button-dropdown/button-dropdown.component';
import { importProvidersFrom } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectorRef } from '@angular/core';
import { IconComponent } from '../../lib/icon/icon.component';
import { ListItemComponent } from '../../lib/list-item/list-item.component';

class MockChangeDetectorRef extends ChangeDetectorRef {
  markForCheck(): void {}
  detach(): void {}
  detectChanges(): void {}
  checkNoChanges(): void {}
  reattach(): void {}
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonDropdownComponent> = {
  title: 'Components/Button.dropdown',
  component: ButtonDropdownComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [
        OverlayModule,
        CommonModule,
        BrowserAnimationsModule,
        IconComponent,
        ListItemComponent,
      ],
      providers: [
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonDropdownComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  argTypes: {
    type: {
      name: 'type',
      table: {
        category: 'Input',
        type: {
          summary:
            "'primary-default'| 'primary-alert'| 'primary-calling'| 'primary-proceed'| 'secondary'| 'tertiary'",
        },
      },
    },
    size: {
      name: 'size',
      table: {
        category: 'Input',
        type: {
          summary: "'xs' | 's' | 'm' | 'l'",
        },
      },
    },
    disabled: {
      name: 'disabled',
      table: {
        category: 'Input',
        type: {
          summary: "'boolean'|'true' | 'false'",
        },
      },
    },
    _hostClass: {
      table: {
        disable: true,
      },
    },
    ngOnChanges: {
      table: {
        disable: true,
      },
    },
    buttonClicked: {
      table: {
        disable: true,
      },
    },
    _ripple: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    type: 'primary-default',
    size: 'l',
    disabled: false,
  },
  render: ({ ...args }) => ({
    props: {
      ...args,
      optionList: [
        { selected: false, value: 'one' },
        { selected: false, value: 'two' },
      ],
    },

    template: `<loom-button-dropdown [type]="type" [size]="size" [disabled]="disabled"><loom-list-item button-dropdown *ngFor="let option of optionList" [value]="option.value" [selected]="option.selected">{{ option.value }}</loom-list-item><loom-icon button-content icon="md-call-white"></loom-icon> </loom-button-dropdown>`,
  }),
};
