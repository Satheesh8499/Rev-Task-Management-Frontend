// import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import { User, UserServiceService } from '../../service/user-service.service';
// declare var bootstrap: any;

// @Component({
//   selector: 'app-user-management',
//   templateUrl: './user-management.component.html',
//   styleUrls: ['./user-management.component.css']
// })
// export class UserManagementComponent implements AfterViewInit {
//   @ViewChild('userModal') userModal!: ElementRef;

//   users: User[] = [];
//   user: User = {
//     id: 0,
//     name: '',
//     email: '',
//     contact: '',
//     role: 'team-member'
//   };

//   constructor(private userService: UserServiceService) {}

//   ngAfterViewInit(): void {
//     if (this.userModal) {
//       console.log('Modal element:', this.userModal.nativeElement);
//     } else {
//       console.error('userModal is not available');
//     }
//   }

//   loadUsers(): void {
//     this.userService.getUsers().subscribe(
//       (users) => {
//         this.users = users;
//       },
//       (error) => {
//         console.error('There was an error!', error);
//       }
//     );
//   }

//   createUser(): void {
//     const maxId = Math.max(...this.users.map(user => user.id));
//     this.user.id = maxId + 1;
//     this.userService.createUser(this.user).subscribe(
//       (response) => {
//         console.log('User created:', response);
//         this.loadUsers(); 
//         const modalElement = new bootstrap.Modal(this.userModal.nativeElement);
//         modalElement.hide();
//       },
//       (error) => {
//         console.error('There was an error!', error);
//       }
//     );
//   }
//   deleteUser(id: any) {
//     if (window.confirm('Are you sure, you want to delete?')) {
//       this.userService.deleteUser(id).subscribe((data) => {
//         console.log(data);
//         this.loadUsers();
//       });
//     }
//   };
  
//   ngOnInit(): void {
//     this.loadUsers();
//   }
// }

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { User, UserServiceService } from '../../service/user-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit {
  @ViewChild('userModal') userModal!: ElementRef;

  users: User[] = [];
  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    role: 'team-member',
  
  };
  isEditing: boolean = false;

  constructor(private userService: UserServiceService) {}

  ngAfterViewInit(): void {
    if (this.userModal) {
      console.log('Modal element:', this.userModal.nativeElement);
    } else {
      console.error('userModal is not available');
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // openModal(): void {
  //   this.isEditing = false;
  //   this.resetForm();
  //   const modalElement = new bootstrap.Modal(this.userModal.nativeElement);
  //   modalElement.show();
  // }

  openCreateUserModal(): void {
    this.isEditing = false;
    this.resetForm();
    const modalElement = new bootstrap.Modal(this.userModal.nativeElement);
    modalElement.show();
  }


  createUser(): void {
    if (this.isEditing) {
      this.updateUser();
    } else {
      const maxId = Math.max(...this.users.map(user => user.id));
      this.user.id = maxId + 1;
      this.userService.createUser(this.user).subscribe(
        (response) => {
          console.log('User created:', response);
          this.loadUsers(); 
          this.hideModal();
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }

  // editUser(user: User): void {
  //   this.isEditing = true;
  //   this.user = { ...user };
  //   const modalElement = new bootstrap.Modal(this.userModal.nativeElement);
  //   this.openModal();
  // }

  editUser(user: User): void {
    this.isEditing = true;
    this.user = { ...user };
    console.log(this.user);
    console.log(user);
    const modalElement = new bootstrap.Modal(this.userModal.nativeElement);
    modalElement.show();
  }

  updateUser(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe(
      (response) => {
        console.log('User updated:', response);
        this.loadUsers();
        this.hideModal();
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  deleteUser(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.userService.deleteUser(id).subscribe((data) => {
        console.log(data);
        this.loadUsers();
      });
    }
  };

  hideModal(): void {
    const modalElement = new bootstrap.Modal(this.userModal.nativeElement);
    modalElement.hide();
    this.resetForm();
  }

  resetForm(): void {
    this.isEditing = false;
    this.user = {
      id: 0,
      username: '',
      email: '',
      password: '',
      role: 'team-member'
    };
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
