import { Component } from '@angular/core';
import { ProfileserviceService } from '../service/profileservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  selectedTab: string = 'general';

  constructor(private profileService:ProfileserviceService){}

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  saveSettings(): void {
    // Add your logic to save settings here
    console.log('Settings saved!');
  }

}
