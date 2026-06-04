import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { NgIf } from '@angular/common';
import { Hero } from '../../components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements AfterViewInit {

  isMobile =
    typeof window !== 'undefined'
      ? window.innerWidth <= 768
      : false;

  showFallback = false;
  contentComponent: any | null = null;

  @ViewChild('bgVideo')
  videoRef?: ElementRef<HTMLVideoElement>;

  @ViewChild('contentContainer', {
    read: ViewContainerRef
  })
  contentContainer?: ViewContainerRef;

  async ngAfterViewInit(): Promise<void> {

    if (!this.isMobile && this.videoRef?.nativeElement) {

      const video = this.videoRef.nativeElement;

      const showFallback = () => {
        this.showFallback = true;
        video.style.display = 'none';
      };

      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      video.load();

      video.play().catch(() => {
        showFallback();
      });

      video.addEventListener('error', showFallback);

      video.addEventListener('stalled', () => {
        if (video.readyState === 0) {
          showFallback();
        }
      });
    }

    if (this.isMobile) {
      this.showFallback = true;
    }

    this.deferContentLoad();
  }

  private async deferContentLoad(): Promise<void> {

    if (this.contentComponent) {
      return;
    }

    const loadContent = async () => {
      const { Content } = await import('../content/content');

      this.contentComponent = Content;

      if (this.contentContainer) {
        this.contentContainer.clear();
        this.contentContainer.createComponent(Content);
      }
    };

    if (
      typeof window !== 'undefined' &&
      'requestIdleCallback' in window
    ) {
      (window as any).requestIdleCallback(() => {
        loadContent();
      });
    } else {
      setTimeout(() => {
        loadContent();
      }, 500);
    }
  }
}