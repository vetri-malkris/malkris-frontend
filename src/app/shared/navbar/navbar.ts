import { Component, signal, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {

  /* ==========================
     STATE
  ========================== */

  isMenuOpen = signal(false);
  isHidden = signal(false);
  scrollY = signal(0);

  lastScroll = 0;
  hideTimer: any;

  constructor(private ngZone: NgZone) {}

  /* ==========================
     INIT
  ========================== */

  ngOnInit(): void {

    this.ngZone.runOutsideAngular(() => {

      window.addEventListener('scroll', () => {

        if (this.isMenuOpen()) return;

        const current =
          window.pageYOffset || document.documentElement.scrollTop;

        const diff = current - this.lastScroll;

        this.ngZone.run(() => {

          /* Update scroll state for glass navbar */
          this.scrollY.set(current);

          /* Top of page */
          if (current <= 20) {
            this.showNavbar();
            clearTimeout(this.hideTimer);
          }

          /* Scroll up */
          else if (diff < -10) {
            this.showNavbar();
            this.autoHide();
          }

          /* Scroll down */
          else if (diff > 4) {
            this.hideNavbar();
          }

        });

        this.lastScroll = current <= 0 ? 0 : current;

      });

    });

  }

  /* ==========================
     MENU
  ========================== */

  toggleMenu(): void {

    this.isMenuOpen.set(!this.isMenuOpen());

    if (this.isMenuOpen()) {
      this.showNavbar();
    } else {
      this.autoHide();
    }
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.autoHide();
  }

  /* ==========================
     NAVBAR HELPERS
  ========================== */

  showNavbar(): void {
    clearTimeout(this.hideTimer);
    this.isHidden.set(false);
  }

  hideNavbar(): void {
    clearTimeout(this.hideTimer);
    this.isHidden.set(true);
  }

  autoHide(): void {

    clearTimeout(this.hideTimer);

    this.hideTimer = setTimeout(() => {

      if (!this.isMenuOpen() && this.lastScroll > 20) {
        this.isHidden.set(true);
      }

    }, 3000);

  }

  /* ==========================
     SMOOTH SCROLL
  ========================== */

  scrollTo(id: string): void {

    this.closeMenu();

    setTimeout(() => {

      const el = document.getElementById(id);

      if (el) {

        const headerOffset = 160;
        const elementPosition = el.getBoundingClientRect().top;

        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

      } else if (id === 'home') {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      }

    }, 100);
  }
}