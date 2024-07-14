import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {
  title:string = "Olympic Games App"
  subtitle:string = "by Télésport"

  constructor() {}

  ngOnInit(): void {
      
  }
}
