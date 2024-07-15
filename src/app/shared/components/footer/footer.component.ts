import { Component } from '@angular/core';
import { ThemeDarkService } from '../../Theme_dark/theme-dark.service';
import { ScrollService } from '../../ScrollService-ToSection/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string ='makaruosmekhail@gmail.com';
  constructor(private themeService: ThemeDarkService,private scrollService: ScrollService) {
  }
  
  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value:string) {
    return this.themeService.getCurrentThemeClass(value);
  }

  scrollToSection(section: string): void {
    this.scrollService.scrollTo(section);
  }
}
