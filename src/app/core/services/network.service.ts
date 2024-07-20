// This service will check if the user network is online/offline
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  // Use of BehaviorSubject to keep the last value received. Need to be initialized with a value.
  // BehaviorSubject give access to the next() method.
  private networkStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!navigator.onLine)
  // State of the network before it changes
  private wasOnline:boolean = true

  constructor(private snackBar: MatSnackBar) {
    // Listening to the network status changes
    window.addEventListener('offline', () => this.updateStatusOffline(true))
    window.addEventListener('online', () => this.updateStatusOffline(false))
  }

  // Check the status of the network
  getNetworkStatus() : Observable<boolean> {
    return this.networkStatus.asObservable()
  }

  // Update the status of the network
  private updateStatusOffline(status: boolean): void {
    this.networkStatus.next(status)
    this.wasOnline = !status
  }

  // Display a message if network is offline, or was offline and is online
  networkStatusMessage(offline: boolean): void {
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
