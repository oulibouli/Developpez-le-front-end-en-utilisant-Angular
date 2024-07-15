import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { NetworkService } from './core/services/network.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title:string = 'olympic-games-starter';

  constructor(private olympicService: OlympicService, private networkService: NetworkService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // We susbcribe to the observable used to get the olympic data
    this.olympicService.loadInitialData().pipe(take(1)).subscribe(); // Use of take(1) to load the initial values once at the startup 

    // We subscribe to an observable to check if network is offline & display a message
    this.networkService.getStatusOnline().subscribe((offline: boolean) => {
      this.networkService.networkStatus(offline)
    })
  }
}
