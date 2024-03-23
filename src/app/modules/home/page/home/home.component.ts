import { Component } from '@angular/core';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private themeService: ThemeDarkService) {
  }
  
  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value:string) {
    return this.themeService.getCurrentThemeClass(value);
  }
}
