import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.icon = 'menu';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should be initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it('Should not be null', () => {
    component.icon = 'menu';
    fixture.detectChanges();
    component.ngOnChanges();
    const icon: any = fixture.elementRef.nativeElement.querySelector('svg');
    expect(icon).not.toEqual(null);
  });
});
