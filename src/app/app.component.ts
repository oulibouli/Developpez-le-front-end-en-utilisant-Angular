import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { NetworkService } from './core/services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title:string = 'olympic-games-starter';
  private networkStatusSubscription!: Subscription;

  constructor(private olympicService: OlympicService, private networkService: NetworkService) {}

  ngOnInit(): void {
    // We susbcribe to the observable used to get the olympic data
    // Use of take(1) to load the initial values once at the startup 
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();

    // We subscribe to an observable to check if the network is offline & display a message
    this.networkStatusSubscription = this.networkService.getNetworkStatus().subscribe((offline: boolean) => {
      this.networkService.networkStatusMessage(offline);
    });
  }

  ngOnDestroy() {
    if (this.networkStatusSubscription) {
      this.networkStatusSubscription.unsubscribe();
    }
  }
}
