import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberLayoutComponent } from './team-member-layout.component';

describe('TeamMemberLayoutComponent', () => {
  let component: TeamMemberLayoutComponent;
  let fixture: ComponentFixture<TeamMemberLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamMemberLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMemberLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
