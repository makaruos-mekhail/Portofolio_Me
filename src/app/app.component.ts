import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { ThemeDarkService } from './shared/Theme_dark/theme-dark.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portofolio Me';
  lang: any = 'en';

  constructor(private router: Router, private translate: TranslateService,private themeService: ThemeDarkService) {
    if (sessionStorage.getItem('lang')) {
      this.lang = sessionStorage.getItem('lang') as string;
    } else {
      this.lang = 'en';
      sessionStorage.setItem('lang', 'en');
    };
    this.translate.use(this.lang);
    this.translate.setDefaultLang(this.lang);

    //  to access the url from router
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.url;
        if (currentUrl.split('/')[1] == '') {
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnInit() {
    const storedIsDarkMode = localStorage.getItem('isDarkMode');
    if (storedIsDarkMode !== null) {
      this.themeService.isDarkMode = storedIsDarkMode === 'true';
    }
  }
}
