import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

// npm i emailjs
// npm install @emailjs/browser --save
// npm install --save-dev @types/emailjs

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent{
  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs.sendForm('service_6cuiktj', 'template_9489a4o', e.target as HTMLFormElement, 'wbkXLJXY0qLT-g4_z')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error: EmailJSResponseStatus) => {
          console.log('FAILED...', error.text);
        }
      );
  }
}


