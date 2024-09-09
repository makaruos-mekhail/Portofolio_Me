import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from 'src/app/shared/services-Animation/animation.service';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  NameTitle :string ='header.projects';
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance;


  itemProjects=[
    {id:1,image:'assets/image/Projects/Deoss.png',title:'projects-details.txtPro1',desc:'projects-details.pro1',link:'https://deoss-congress.vercel.app'},
    {id:2,image:'assets/image/Projects/HGR.png',title:'projects-details.txtPro2',desc:'projects-details.pro2',link:'https://hany-george.com/'},
    {id:3,image:'assets/image/Projects/K-Group.png',title:'projects-details.txtPro3',desc:'projects-details.pro3',link:'https://k-group.vercel.app'},
    {id:4,image:'assets/image/Projects/Origin.png',title:'projects-details.txtPro4',desc:'projects-details.pro4',link:'https://origin-zeta.vercel.app'},
    {id:5,image:'assets/image/Projects/Sham-pistachio0.PNG',title:'projects-details.txtPro5',desc:'projects-details.pro5',link:'https://sham-pistachio.vercel.app'},
    {id:6,image:'assets/image/Projects/Printex.png',title:'projects-details.txtPro6',desc:'projects-details.pro6',link:'https://prentex-new-version.vercel.app'},
    {id:7,image:'assets/image/Projects/FlexSign.png',title:'projects-details.txtPro7',desc:'projects-details.pro7',link:'https://flex-sign-website.vercel.app'},
    {id:8,image:'assets/image/Projects/Fanarah.png',title:'projects-details.txtPro8',desc:'projects-details.pro8',link:'https://fanarah-api-new.vercel.app'},
    {id:9,image:'assets/image/Projects/Modevia.PNG',title:'projects-details.txtPro9',desc:'projects-details.pro9',link:'https://modevia-bay.vercel.app'},
    {id:10,image:'assets/image/Projects/Prints.PNG',title:'projects-details.txtPro10',desc:'projects-details.pro10',link:'https://prints-api.vercel.app'},
    // {id:11,image:'',title:'Polymers Shop',desc:'',link:''},
    // {id:12,image:'',title:'Elegant E-commerce',desc:'',link:''},
  ]

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

  ngOnInit(): void {
        setTimeout(() => {
          this.ngAfterViewInit(), 0
        });
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
      slides: {
        perView: 3,
        spacing: 18,
      },
      breakpoints: {
        '(min-width: 1251px)': {
          slides: {
            perView: 3,
            spacing: 18,
          },
        },
        '(max-width: 1250px)': {
          slides: {
            perView: 3,
            spacing: 15,
          },
        },
        '(max-width: 500px)': {
          slides: {
            perView: 1,
            spacing: 10,
          },
        },
      },
      renderMode: "performance",
      drag: true,
      },
      [
        (slider) => {
          let timeout:any;
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            // {
              // clearTimeout(timeout);
              if (mouseOver) return
            // }
            timeout = setTimeout(() => {
              slider.next()
            }, 2000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              // {
                mouseOver = true
                clearNextTimeout()
                // mouseOver = false;
                // nextTimeout();
              // }
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
    )

    //Animation
    if (this.animatedElements) {
      this.animatedElements.forEach((element) => {
        this.animationService.addElement(element);
      });
      this.animationService.onScroll();
    }
  }



  ngOnDestroy() {
    if (this.slider) this.slider.destroy()

    //Animation
      if (this.animatedElements) {
        this.animatedElements.forEach((element) => {
          this.animationService.removeElement(element);
        });
      }
  }

  goToNextSlide() {
    this.slider?.next();
  }

  goToPrevSlide() {
    this.slider?.prev();
  }



    //Animation
    @ViewChildren('ProjectAnimation')
    animatedElements?: QueryList<ElementRef>;
  
    // ngAfterViewInit(): void {
    //   if (this.animatedElements) {
    //     this.animatedElements.forEach((element) => {
    //       this.animationService.addElement(element);
    //     });
    //     this.animationService.onScroll();
    //   }
    // }
  
    // ngOnDestroy(): void {
    //   if (this.animatedElements) {
    //     this.animatedElements.forEach((element) => {
    //       this.animationService.removeElement(element);
    //     });
    //   }
    // }
  
    @HostListener('window:scroll', [])
    onWindowScroll(): void {
      this.animationService.onScroll();
    }
}
