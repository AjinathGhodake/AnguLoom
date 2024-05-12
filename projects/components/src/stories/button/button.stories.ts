import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ButtonDefaultComponent } from '../../lib/button/button-default/button-default.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonDefaultComponent> = {
  title: 'Components/Button',
  component: ButtonDefaultComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    moduleMetadata({
      imports: [OverlayModule, CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonDefaultComponent>;

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
  render: (args: ButtonDefaultComponent) => ({
    props: {
      ...args,
    },
    template: `<loom-button-default [type]="type" [size]="size" [disabled]="disabled">
    click me!
  </loom-button-default>`,
  }),
};
