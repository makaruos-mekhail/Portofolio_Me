import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private elements: Map<ElementRef, boolean> = new Map();

  addElement(element: ElementRef): void {
    this.elements.set(element, false);
    this.updateElementVisibility(element);
  }

  removeElement(element: ElementRef): void {
    this.elements.delete(element);
  }

  private updateElementVisibility(element: ElementRef): void {
    const sectionOffset = element.nativeElement.offsetTop;
    const windowHeight = window.innerHeight;
    const pageOffset = window.pageYOffset;

    if (pageOffset >= sectionOffset - windowHeight && pageOffset < sectionOffset) {
      this.showElement(element);
    } else {
      this.hideElement(element);
    }
  }

  private showElement(element: ElementRef): void {
    element.nativeElement.classList.remove('hide_opacity');
    element.nativeElement.classList.add('Show_opacity');
    this.elements.set(element, true);
  }

  private hideElement(element: ElementRef): void {
    element.nativeElement.classList.remove('Show_opacity');
    element.nativeElement.classList.add('hide_opacity');
    this.elements.set(element, false);
  }

  onScroll(): void {
    this.elements.forEach((_, element) => {
      this.updateElementVisibility(element);
    });
  }
}
