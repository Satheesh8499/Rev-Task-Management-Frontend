import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapDialogComponent } from './bootstrap-dialog.component';

describe('BootstrapDialogComponent', () => {
  let component: BootstrapDialogComponent;
  let fixture: ComponentFixture<BootstrapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BootstrapDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootstrapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
