import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/shared/ScrollService-ToSection/scroll.service';
import { AnimationService } from 'src/app/shared/services-Animation/animation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('home') homeSection!: ElementRef;
  @ViewChild('skils') skilsSection!: ElementRef;
  @ViewChild('projects') projectsSection!: ElementRef;
  @ViewChild('about') aboutSection!: ElementRef;
  @ViewChild('contact') contactSection!: ElementRef;
  private scrollSubscription!: Subscription;


  constructor(private themeService: ThemeDarkService, private translate: TranslateService, private scrollService: ScrollService,
    private animationService: AnimationService) {
  }

  ngOnInit(): void {
    // Print one letter at a time and translate to en or ar 
    this.translate.get('home.Welcome').subscribe((translation: string) => {
      this.sentence = translation;
      this.printSentence();
    });

    // scrollToSection 
    this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(section => {
      this.scrollToSection(section);
    });
  }

  // scrollToSection 
  scrollToSection(section: string): void {
    let element: HTMLElement;
    switch (section) {
      case 'home':
        element = this.homeSection.nativeElement;
        break;
      case 'skils':
        element = this.skilsSection.nativeElement;
        break;
      case 'projects':
        element = this.projectsSection.nativeElement;
        break;
      case 'about':
        element = this.aboutSection.nativeElement;
        break;
      case 'contact':
        element = this.contactSection.nativeElement;
        break;
      default:
        return;
    }

    const offset = 70; // 10 pixels offset
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  //Print one letter at a time
  sentence: string = '';
  delay: number = 70;
  output: string = '';

  printSentence() {
    const words = this.sentence.split(' ');
    let i = 0;
    let j = 0;
    const intervalId = setInterval(() => {
      if (words[i][j] === ' ') {
        this.output += '&nbsp;';
      }
      else if (words[i][j] === '.') {
        this.output += '<br>';
      } else {
        this.output += `<span>${words[i][j]}</span>`;
      }
      j++;
      if (j >= words[i].length) {
        i++;
        j = 0;
        this.output += ' ';
      }
      if (i >= words.length) {
        clearInterval(intervalId);
      }
    }, this.delay);
  }

  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value: string) {
    return this.themeService.getCurrentThemeClass(value);
  }

  // downloadPDF
  downloadPDF(filePath: string): void {
    const a = window.document.createElement('a');
    const fileName = filePath.split('/').pop();
    a.setAttribute('href', filePath);
    a.setAttribute('download', fileName || 'downloadedFile.pdf');
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
  }

  //Animation
  @ViewChildren('ImagePortofolio, TextAnimation') animatedElements?: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    if (this.animatedElements) {
      this.animatedElements.forEach(element => {
        this.animationService.addElement(element);
      });
      this.animationService.onScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.animatedElements) {
      this.animatedElements.forEach(element => {
        this.animationService.removeElement(element);
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.animationService.onScroll();
  }
}
