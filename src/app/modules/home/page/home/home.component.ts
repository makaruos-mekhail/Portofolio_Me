import { Component, OnInit } from '@angular/core';
import { ThemeDarkService } from 'src/app/shared/Theme_dark/theme-dark.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sentence: string = '';
  delay: number = 70;
  output: string = '';


  ngOnInit(): void {
    this.translate.get('home.Welcome').subscribe((translation: string) => {
      this.sentence = translation;
      this.printSentence();
    });
  }

  // ngOnInit(): void {
  //   this.printSentence();
  // }

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


  constructor(private themeService: ThemeDarkService,private translate: TranslateService) {
  }

  // dark mode
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  getCurrentThemeClass(value: string) {
    return this.themeService.getCurrentThemeClass(value);
  }
}
