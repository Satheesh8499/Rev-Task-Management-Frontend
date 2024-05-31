import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  // it('should allow the authenticated user to access app', () => {
  //   authService.isLoggedIn.and.returnValue(true);
  //   expect(authGuard.canActivate()).toBe(true);
  // });

  // it('should not allow the unauthenticated user to access app', () => {
  //   authService.isLoggedIn.and.returnValue(false);
  //   spyOn(router, 'navigate');
  //   expect(authGuard.canActivate()).toBe(false);
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
  // });
});
