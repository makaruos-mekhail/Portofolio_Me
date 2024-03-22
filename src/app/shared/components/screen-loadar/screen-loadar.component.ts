import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-screen-loadar',
  templateUrl: './screen-loadar.component.html',
  styleUrls: ['./screen-loadar.component.scss']
})
export class ScreenLoadarComponent {
  showLoader: boolean = false;

  constructor(private router: Router) {}

  // constructor(public sharedService:SharedService){    
  // }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
        }, 1000);
      }
    });
  }
}
