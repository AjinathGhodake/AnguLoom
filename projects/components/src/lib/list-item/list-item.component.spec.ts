import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListItemComponent } from './list-item.component';

@Component({
  template: `
    <bsx-list-item>List item Default</bsx-list-item>
    <bsx-list-item [selected]="true">List item Active</bsx-list-item>
    <bsx-list-item [selected]="false"
      >List item 1<span subtext>Metadata</span></bsx-list-item
    >
    <bsx-list-item [selected]="true"
      >List item 2<span subtext>Metadata</span></bsx-list-item
    >
    <bsx-list-item [multiSelect]="true">List item with checkbox</bsx-list-item>
    <bsx-list-item [nonClickable]="true">List item non clickable</bsx-list-item>
  `,
})
class TestHostComponent {}
describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    fixture.detectChanges();
    hostFixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(hostComponent).toBeTruthy();
  });

  it('should create five bsx-list-item template', () => {
    const element = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    expect(element.length).toEqual(6);
  });

  it('should render default bsx-list-item', () => {
    const element = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    hostFixture.detectChanges();
    expect(element[0].nativeElement.textContent).toEqual('List item Default');
  });

  it('should render active bsx-list-item', () => {
    const element = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    hostFixture.detectChanges();
    expect(element[1].nativeElement.textContent).toEqual('List item Active');
    expect(element[1].properties['className']).toEqual('active');
  });

  it('should render default bsx-list-item with Metadata', () => {
    const element = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    hostFixture.detectChanges();
    expect(element[2].nativeElement.textContent).toEqual('List item 1Metadata');
    expect(element[2].properties['className']).toEqual(
      'list__metadata-container',
    );
  });

  it('should render active bsx-list-item with Metadata', () => {
    const element = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    hostFixture.detectChanges();
    expect(element[3].nativeElement.textContent).toEqual('List item 2Metadata');
    expect(element[3].properties['className']).toEqual(
      'active list__metadata-container',
    );
  });

  it('should render default bsx-list-item with Checkbox', () => {
    const listItem = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    hostFixture.detectChanges();
    expect(listItem[4].nativeElement.textContent).toEqual(
      'List item with checkbox',
    );
    expect(
      listItem[4].nativeElement.firstElementChild.firstElementChild
        .firstElementChild.className,
    ).toEqual('checkbox__container');
  });
  it('should render bsx-list-item for non clickable', () => {
    const listItem = hostFixture.debugElement.queryAll(By.css('bsx-list-item'));
    hostFixture.detectChanges();
    expect(listItem[5].nativeElement.textContent).toEqual(
      'List item non clickable',
    );
    expect(listItem[5].properties['className']).toEqual('non-clickable');
  });
});
