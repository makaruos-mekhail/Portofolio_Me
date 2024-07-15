import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from 'src/app/shared/services-Animation/animation.service';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// npm i emailjs
// npm install @emailjs/browser --save
// npm install --save-dev @types/emailjs

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent{
  NameTitle :string ='header.contact';

  constructor(private themeService: ThemeDarkService, private translate: TranslateService,
    private animationService: AnimationService,private toastrService: ToastrService,private fb: FormBuilder,) {
  }
  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value: string) {
    return this.themeService.getCurrentThemeClass(value);
  }

  public validateInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^\d]/g, '');
  }
  


  public sendEmail(e: Event) {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;

    if (!form.checkValidity()) {
      this.toastrService.error('Please fill in all fields correctly.');
      return;
    }

    emailjs.sendForm('service_6cuiktj', 'template_9489a4o', e.target as HTMLFormElement, 'wbkXLJXY0qLT-g4_z')
      .then(
        () => {
          form.reset();
          this.toastrService.success('Email Sent Successfully');
        },
        (error: EmailJSResponseStatus) => {
            this.toastrService.error('invalid Sent Email');
        }
      );
  }
  


    //Animation
    @ViewChildren('ContactusAnimation')
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


