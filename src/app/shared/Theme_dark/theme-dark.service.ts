import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeDarkService {
  isDarkMode: boolean = false;

  constructor() {
    const storedDarkMode = localStorage.getItem('DarkMode');
    this.isDarkMode = storedDarkMode === 'false';
  }
  

   toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('DarkMode', this.isDarkMode ? 'false' : 'true');
  }

  getCurrentThemeClass(baseClass: string): string {
    return this.isDarkMode ? `${baseClass}_light` : baseClass;
  }
}
