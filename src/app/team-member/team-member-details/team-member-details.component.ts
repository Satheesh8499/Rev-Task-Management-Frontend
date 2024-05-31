import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../service/project-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface TeamMember {
  id: number;
  username: string;
  email: string;
  designation: string;
}

@Component({
  selector: 'app-team-member-details',
  templateUrl: './team-member-details.component.html',
  styleUrls: ['./team-member-details.component.css']
})
export class TeamMemberDetailsComponent implements OnInit {
  showData: boolean = false;
  teamMembers: TeamMember[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectServiceService, private modalService: NgbModal) {}

  ngOnInit(): void {
    //this.getTeamMembers(9164); 
    this.route.params.subscribe(params => {
      const teamMemebersString = params['teamMembers'];
      console.log(teamMemebersString);
      // console.log(tasksString);
      // this.projectId = params['projectId'];
         this.teamMembers=JSON.parse(teamMemebersString);
         console.log(this.teamMembers);
      // console.log(this.tasks);
      // this.getProjectDetails(this.projectId); // Fetch project details including team members
    });
   
  }

  toggleData() {
    this.showData = !this.showData;
  }

  getTeamMembers(projectId: number) {
    // this.projectService.getTeamMembers(projectId).subscribe(
    //   (teamMembers: TeamMember[]) => {
    //     this.teamMembers = teamMembers;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching team members:', error);
    //     this.teamMembers = [];
    //   }
    // );
      // this.teamMembers = [
      // { teamMemberID: 1, teamMemberName: 'John Doe', email: 'john@example.com', designation: 'Developer' },
      // { teamMemberID: 2, teamMemberName: 'Jane Smith', email: 'jane@example.com', designation: 'Designer' },
      // Add more hardcoded team members as needed
    
  }
}