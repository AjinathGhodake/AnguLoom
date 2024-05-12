import { OverlayModule } from '@angular/cdk/overlay';
import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonDefaultComponent } from './button-default.component';

@Component({
  template: `<bsx-button type="primary-default" size="l" (click)="openAlert()"
    >Text</bsx-button
  >`,
})
class TestHostComponent {
  openAlert() {
    alert('Hi');
  }
}

describe('ButtonDefaultComponent', () => {
  let component: ButtonDefaultComponent;
  let fixture: ComponentFixture<ButtonDefaultComponent>;
  window.alert = jest.fn();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonDefaultComponent, TestHostComponent],
      imports: [BrowserAnimationsModule, OverlayModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('click event should work upon button click ', fakeAsync(() => {
    const hostFixture: ComponentFixture<TestHostComponent> =
      TestBed.createComponent(TestHostComponent);
    const hostComponent: TestHostComponent = hostFixture.componentInstance;
    const btn = hostFixture.debugElement.query(By.css('bsx-button'));
    const eventSpy = jest.spyOn(hostComponent, 'openAlert');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    btn.nativeElement.dispatchEvent(event);
    tick();
    expect(eventSpy).toHaveBeenCalled();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign button type primary as default', () => {
    fixture = TestBed.createComponent(ButtonDefaultComponent);
    component = fixture.componentInstance;
    expect(component.type).toEqual('primary-default');
  });

  it('should assign button size large(l) as default', () => {
    fixture = TestBed.createComponent(ButtonDefaultComponent);
    component = fixture.componentInstance;
    expect(component.size).toEqual('l');
  });

  it('should have primary class applied to host element', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();
    const primaryButton: HTMLElement = testFixture.debugElement.query(
      By.css('bsx-button'),
    ).nativeElement;
    testFixture.detectChanges();
    expect(primaryButton.className).toContain('button--primary');
  });

  it('should have l(Large) class applied to host element', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();
    const primaryButton: HTMLElement = testFixture.debugElement.query(
      By.css('bsx-button'),
    ).nativeElement;
    testFixture.detectChanges();
    expect(primaryButton.className).toContain('button--l');
  });

  it('should display button', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();
    const button: HTMLElement = testFixture.debugElement.query(
      By.css('bsx-button'),
    ).nativeElement;
    expect(button).not.toBeNull();
  });

  it('content projection should work', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    testFixture.detectChanges();
    const content: DebugElement = testFixture.debugElement.query(
      By.css('bsx-button'),
    );
    const contentElement: Element = content.nativeElement;
    expect(contentElement.textContent).toEqual('Text');
  });

  it('should assign primary,tertiary,secondary class', () => {
    fixture = TestBed.createComponent(ButtonDefaultComponent);
    component = fixture.componentInstance;
    component.type = 'primary-default';
    fixture.detectChanges();
    const primaryType = fixture.debugElement.componentInstance.type;
    expect(primaryType).toEqual('primary-default');
    component.type = 'secondary';
    fixture.detectChanges();
    const secondaryType = fixture.debugElement.componentInstance.type;
    expect(secondaryType).toEqual('secondary');
    component.type = 'tertiary';
    fixture.detectChanges();
    const tertiaryType = fixture.debugElement.componentInstance.type;
    expect(tertiaryType).toEqual('tertiary');
  });

  it('should assign large,small,Extra small size', () => {
    fixture = TestBed.createComponent(ButtonDefaultComponent);
    component = fixture.componentInstance;
    component.size = 'l';
    fixture.detectChanges();
    const sizeLarge = fixture.debugElement.componentInstance.size;
    expect(sizeLarge).toEqual('l');
    component.size = 's';
    fixture.detectChanges();
    const sizeSmall = fixture.debugElement.componentInstance.size;
    expect(sizeSmall).toEqual('s');
    component.size = 'xs';
    fixture.detectChanges();
    const sizeXs = fixture.debugElement.componentInstance.size;
    expect(sizeXs).toEqual('xs');
  });

  it('should assign hostClass with type and size combined', () => {
    component.type = 'secondary';
    component.size = 's';
    component.ngOnChanges();
    expect(component._hostClass).toEqual('button--secondary button--s');
  });
});
