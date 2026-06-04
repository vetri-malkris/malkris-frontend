import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements AfterViewInit {

  async ngAfterViewInit(): Promise<void> {
    // Disabled Lenis and smooth scrolling to avoid Mac scroll lag.
    // Native browser scrolling is used instead for the best cross-platform performance.
  }

}