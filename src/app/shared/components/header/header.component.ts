import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeDarkService } from '../../Theme_dark/theme-dark.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{
  windowScrolled: boolean = false;

  isDark? :boolean;

  ngOnInit(): void {
    if(localStorage.getItem('DarkMode') == 'true'){
       this.isDark = true;
    }else{
      this.isDark = false;

    }    
  }

  [x: string]: any;
  lang: string = sessionStorage.getItem('lang') || 'en';

  constructor(private translate: TranslateService,private renderer: Renderer2,private themeService: ThemeDarkService) {
    this.switchPagesDirection(this.lang);

  }
  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value:string) {
    return this.themeService.getCurrentThemeClass(value);
  }

  switchLanguage(lang: string) {
    sessionStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.switchPagesDirection(lang);
    window.location.reload();
  }
  switchPagesDirection(lang: any) {
    if (lang == 'en'){
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
     }
    else if (lang == 'ar') {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  
  @HostListener("window:scroll", [])
  onWindowScroll() {

      if (window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

  scrollToTop(){
    window.scroll({
      top: 0,
      behavior: 'smooth'
    }) 
  }
}
