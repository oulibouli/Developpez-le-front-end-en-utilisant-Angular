// This service will check if the user network is online/offline
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private statusOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!navigator.onLine)
  wasOnline:boolean = true
  constructor(private snackBar: MatSnackBar) {
    // Detection network status
    window.addEventListener('offline', () => this.updateStatusOnline(true))
    window.addEventListener('online', () => this.updateStatusOnline(false))
  }

  updateStatusOnline(status: boolean): void {
    this.statusOnline.next(status)
    this.wasOnline = !status

    console.log(this.statusOnline)
    console.log(this.wasOnline)
  }

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
      this.snackBar.open(message,'', {
        duration: 1500
      })
    }
  }
}
