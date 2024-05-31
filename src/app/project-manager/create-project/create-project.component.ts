import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface users {
  id: number;
  name: string;
  email: string;
  contact: number;
  role: string
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projects: any[] = [];
  elementRef: ElementRef;
  teamMembers: any[] = [];
  selectedMembers: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private el: ElementRef
  ) { 
    this.elementRef = el;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':2,
      'role':'Project'
    }),
  };

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      // projectID: ['', Validators.required],
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      clientID: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      teamMembersIds:[[]]
    });
    this.http.get<any[]>('http://localhost:8080/users/getAllUsers').subscribe(
  (teamMembers) => {
    this.teamMembers = teamMembers;
    console.log('Team members:', this.teamMembers);
  },
  (error) => {
    console.error('Error fetching team members:', error);
  }
);
}
  

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      const projectData = {
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        status: formData.status,
        startDate: new Date().toISOString().split('T')[0],
        endDate: formData.endDate,
        clientId: formData.clientID,
        projectManagerId: 2, // Assuming you have a project manager ID
        teamMemberIds: this.selectedMembers
      };
      console.log(projectData);
      // Make an HTTP POST request to the JSON Server
      this.http.post<any>('http://localhost:8080/projects', projectData,this.httpOptions)
        .subscribe(
          (response) => {
            console.log('Project created successfully:', response);
            // Optionally, you can clear the form after successful creation
            this.projectForm.reset();
          },
          (error) => {
            console.error('Error creating project:', error);
            // Handle error, display error message, etc.
          }
        );
    } else {
      // Handle form validation errors
      alert('Please fill out all required fields.');
    }
  }

  toggleSelection(memberID: number) {
    const index = this.selectedMembers.indexOf(memberID);
    if (index === -1) {
      this.selectedMembers.push(memberID);
    } else {
      this.selectedMembers.splice(index, 1);
    }
    // this.projectForm.get('teamMemberIds').setValue(this.selectedMembers);

  }

  openPopup() {
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
      popupForm.style.display = 'block';
    }
  }

  closePopup() {
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
      popupForm.style.display = 'none';
    }
  }

  addSelectedMembers() {
    // Handle adding selected members to the project
    console.log('Selected members:', this.selectedMembers);
    // You can reset selectedMembers array or perform any other action here
    // this.selectedMembers = [];
    this.closePopup(); // Close the popup after adding members
  }
}
