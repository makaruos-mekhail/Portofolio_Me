import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from 'src/app/shared/services-Animation/animation.service';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';

@Component({
  selector: 'app-services-home',
  templateUrl: './services-home.component.html',
  styleUrls: ['./services-home.component.scss'],
})
export class ServicesHomeComponent {
  NameTitle: string = 'header.service';

  itemServices = [
    {
      id: 1,
      title: 'services.serviceTitle1',
      desc: 'services.serviceDesc1',
      icon: 'fa-solid fa-sitemap',
    },
    {
      id: 2,
      title: 'services.serviceTitle2',
      desc: 'services.serviceDesc2',
      icon: 'fa-brands fa-figma',
    },
    {
      id: 3,
      title: 'services.serviceTitle3',
      desc: 'services.serviceDesc3',
      icon: 'fa-brands fa-html5',
    },
    {
      id: 4,
      title: 'services.serviceTitle4',
      desc: 'services.serviceDesc4',
      icon: 'fa-solid fa-laptop-code',
    },
  ];

  constructor(
    private themeService: ThemeDarkService,
    private translate: TranslateService,
    private animationService: AnimationService
  ) {}
  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value: string) {
    return this.themeService.getCurrentThemeClass(value);
  }

  //Animation
  @ViewChildren('ServicesAnimation')
  animatedElements?: QueryList<ElementRef>;

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
