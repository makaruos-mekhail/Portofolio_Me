import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';
import { AnimationService } from 'src/app/shared/services-Animation/animation.service';

@Component({
  selector: 'app-skils',
  templateUrl: './skils.component.html',
  styleUrls: ['./skils.component.scss']
})
export class SkilsComponent {
  NameTitle: string = 'header.skils';

  skills = [
    { src: 'assets/image/Skils/Html.png', alt: 'HTML' },
    { src: 'assets/image/Skils/TypeScript.png', alt: 'TypeScript' },
    { src: 'assets/image/Skils/Scss.png', alt: 'SCSS' },
    { src: 'assets/image/Skils/Css.png', alt: 'CSS' },
    { src: 'assets/image/Skils/Angular.png', alt: 'Angular' },
    { src: 'assets/image/Skils/Js.png', alt: 'JavaScript' },
    { src: 'assets/image/Skils/Github.png', alt: 'GitHub' },
    { src: 'assets/image/Skils/Boostrap.png', alt: 'Bootstrap' },
    { src: 'assets/image/Skils/APi.png', alt: 'API' }
  ];
  
  constructor(private themeService: ThemeDarkService, private translate: TranslateService,
    private animationService: AnimationService) {
  }

  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value: string) {
    return this.themeService.getCurrentThemeClass(value);
  }


  //Animation
  @ViewChildren('skilsAnimation') animatedElements?: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    if (this.animatedElements) {
      this.animatedElements.forEach((element) => {
        this.animationService.addElement(element);
      });
      this.animationService.onScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.animatedElements) {
      this.animatedElements.forEach((element) => {
        this.animationService.removeElement(element);
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.animationService.onScroll();
  }
}
