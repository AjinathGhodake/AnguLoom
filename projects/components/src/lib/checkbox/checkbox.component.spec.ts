import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize checked value of checkbox', () => {
    component.writeValue(true);
    expect(component.checked).toBe(true);
  });

  it('setting checked property to true activates checkbox', () => {
    component.checked = true;
    const inputElement = fixture.debugElement.query(
      By.css('.checkbox__input'),
    ).nativeElement;
    fixture.detectChanges();
    expect(inputElement.checked).toBeTruthy();
  });

  it('clicking checkbox emits checked property value', () => {
    let checked = false;
    component.onClick.subscribe((value) => {
      checked = value;
    });
    const inputElement = fixture.debugElement.query(
      By.css('input[type=checkbox]'),
    );
    inputElement.triggerEventHandler('click', {
      target: { checked: true },
    });
    expect(checked).toBe(true);
  });
});
