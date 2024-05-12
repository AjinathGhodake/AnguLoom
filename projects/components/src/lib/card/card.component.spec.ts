import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({})
class TestHostComponent {}
describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardTypeEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have card type as section-card', () => {
    component.cardType = 'section-card';
    expect(component.cardType).toEqual('section-card');
  });
  it('should have card type as dropdown-card', () => {
    component.cardType = 'dropdown-card';
    expect(component.cardType).toEqual('dropdown-card');
  });
  it('should have card type as dialogue-card', () => {
    component.cardType = 'dialogue-card';
    expect(component.cardType).toEqual('dialogue-card');
  });
  it('should have card type as non-radius-card', () => {
    component.cardType = 'non-radius-card';
    expect(component.cardType).toEqual('non-radius-card');
  });

  it('hostClass  should get card type as non-radius-card', () => {
    component._hostClass = 'non-radius-card';
    expect(component._hostClass).toEqual('non-radius-card');
  });
  it('hostClass should not contain other card excluding the one which has be assigned', () => {
    component._hostClass = 'non-radius-card';
    expect(component._hostClass).not.toContainEqual('dialogue-card');
  });

  it('should assign card type to _hostClass on Constructor', () => {
    expect(component._hostClass).toContain(component.cardType);
  });
});
