import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeDarkService {
  isDarkMode: boolean = true;

  constructor() {
    const storedDarkMode = localStorage.getItem('DarkMode');
    // this.isDarkMode = storedDarkMode === 'true';

    if (localStorage.getItem('DarkMode')) {
      this.isDarkMode = storedDarkMode === 'true';
    } else {
      this.isDarkMode = storedDarkMode === 'false';
    };
  }
  


   toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('DarkMode', this.isDarkMode ? 'true' : 'false');
  }


  
  


  getCurrentThemeClass(baseClass: string): string {
    return this.isDarkMode ? `${baseClass}_light` : baseClass;
  }
}
