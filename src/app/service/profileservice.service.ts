import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {

  private settingsUrl = "assets/data/db.json";
  profileService: any;
  constructor(private http: HttpClient){}
  getSettings(): Observable<ProfileserviceService>{
    return this.http.get<ProfileserviceService>(this.settingsUrl);
     
  }
  saveSettings(): void {
    this.profileService.saveSettings().subscribe(
      (updatedSettings: any) => {
        console.log('Updated settings:', updatedSettings);
        // Optionally display a success message or update the UI
      },
      (error: any) => {
        console.error('Error updating settings:', error);
        // Optionally display an error message
      }
    );
  }

}
