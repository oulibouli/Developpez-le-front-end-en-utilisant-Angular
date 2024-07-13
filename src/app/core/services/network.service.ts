// This service will check if the user network is online/offline
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OlympicService } from './olympic.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private statusOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!navigator.onLine)
  private wasOnline:boolean = true

  constructor(private snackBar: MatSnackBar, private olympicService: OlympicService) {
    // Detection of the network status
    window.addEventListener('offline', () => this.updateStatusOnline(true))
    window.addEventListener('online', () => this.updateStatusOnline(false))
  }

  // Update the status of the network
  updateStatusOnline(status: boolean): void {
    this.statusOnline.next(status)
    this.wasOnline = !status
  }

  // Check the status of the network
  getStatusOnline() : Observable<boolean> {
    return this.statusOnline.asObservable()
  }

  // Display message if network is offline, or was offline and is online
  networkStatus(offline: boolean): void {
    if(offline && this.wasOnline) {
      const message = 'You are not online. Data will not be updated.'
      this.snackBar.open(message,'', {
        duration: 1500
      })
    } else if(!offline && !this.wasOnline) {
      const message = 'You are now online. Data will be updated.'

      //Refresh the data
      this.olympicService.loadInitialData().pipe(take(1)).subscribe();
      this.snackBar.open(message,'', {
        duration: 1500
      })
    }
  }
}
