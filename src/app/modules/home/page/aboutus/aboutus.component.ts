import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { Meta, Title } from '@angular/platform-browser';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from 'src/app/shared/services-Animation/animation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {
  NameTitle :string ='header.about';


  constructor(private themeService: ThemeDarkService, private translate: TranslateService,
    private animationService: AnimationService,private toastrService: ToastrService) {
  }
  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value: string) {
    return this.themeService.getCurrentThemeClass(value);
  }


  //Animation
  @ViewChildren('AboutusAnimation')
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
