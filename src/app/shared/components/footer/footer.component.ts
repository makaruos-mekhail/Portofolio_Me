import { Component } from '@angular/core';
import { ThemeDarkService } from '../../Theme_dark/theme-dark.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
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
