// This service will check if the user network is online/offline
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private statusOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!navigator.onLine)
  private wasOnline:boolean = true

  constructor(private snackBar: MatSnackBar) {
    // Detection of the network status
    window.addEventListener('offline', () => this.updateStatusOffline(true))
    window.addEventListener('online', () => this.updateStatusOffline(false))
  }

  // Check the status of the network
  getStatusOnline() : Observable<boolean> {
    return this.statusOnline.asObservable()
  }

  // Update the status of the network
  updateStatusOffline(status: boolean): void {
    this.statusOnline.next(status)
    this.wasOnline = !status
  }

  // Display message if network is offline, or was offline and is online
  networkStatus(offline: boolean): void {
    let message:string = ''
    if(offline && this.wasOnline) {
      message = 'You are not online. Data will not be updated.'
      this.snackBar.open(message,'', { duration: 1500 })
    } else if(!offline && !this.wasOnline) {
      message = 'You are now online. Data will be updated.'

      // Display the notification message
      if(message) { this.snackBar.open(message,'', { duration: 1500 }) }
    }
  }
}
