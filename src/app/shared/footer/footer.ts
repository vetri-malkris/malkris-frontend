import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer implements AfterViewInit {

  @ViewChild('logoVideo', { static: false })
  logoVideo!: ElementRef<HTMLVideoElement>;

  @ViewChild('malkrisFallback', { static: false })
  malkrisFallback!: ElementRef<HTMLElement>;

  @ViewChild('footerSection', { static: false })
  footerSection!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    const video = this.logoVideo.nativeElement;

    const fallback = this.malkrisFallback.nativeElement;

    const showFallback = () => {
      fallback.style.display = 'flex';
    };

    const hideFallback = () => {
      fallback.style.display = 'none';
    };

    /* iOS SAFARI FIX */
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    

    const tryPlay = async () => {
      try {
        await video.play();
        hideFallback();
      } catch (error) {
        showFallback();
      }
    };

    video.addEventListener('playing', () => {
      hideFallback();
    });

    video.addEventListener('canplay', () => {
      tryPlay();
    });

    video.addEventListener('error', () => {
      showFallback();
    });

    const footer = this.footerSection?.nativeElement;
    if (footer && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          obs.disconnect();
          video.load();
          tryPlay();
        }
      }, { threshold: 0.1 });
      observer.observe(footer);
    } else {
      setTimeout(() => {
        video.load();
        tryPlay();
      }, 300);
    }

  }

}