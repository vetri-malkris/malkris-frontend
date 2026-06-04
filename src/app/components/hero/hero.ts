import { Component, AfterViewInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero implements AfterViewInit {

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {

    // Spotlight / mask effect only
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', (e: MouseEvent) => {
        document.querySelectorAll('.logo-small').forEach((el) => {
          const rect = el.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          (el as HTMLElement).style.setProperty('--mouseX', `${x}px`);
          (el as HTMLElement).style.setProperty('--mouseY', `${y}px`);
        });
      });
    });
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);

    if (el) {
      const headerOffset = 100;
      const offsetPosition =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      });
    }
  }
}