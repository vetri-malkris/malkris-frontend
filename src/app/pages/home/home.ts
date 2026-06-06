import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Hero } from '../../components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements AfterViewInit {

  contentComponent: any | null = null;

  @ViewChild('contentContainer', {
    read: ViewContainerRef
  })
  contentContainer?: ViewContainerRef;

  async ngAfterViewInit(): Promise<void> {
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