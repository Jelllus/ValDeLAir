import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.css'
})
export class GalerieComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    //css
    this.loadCSS('assets/galerie/css/main.css');
    this.loadCSS('assets/galerie/css/noscript.css');
    this.loadCSS('assets/galerie/css/fontawesome-all.min.css');
  }

  private loadCSS(href: string): void {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    this.document.head.appendChild(link);
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      const links = document.querySelectorAll('link[dynamic-css]');
      links.forEach(link => link.remove());

      const scripts = document.querySelectorAll('script[dynamic-js]');
      scripts.forEach(script => script.remove());

      this.renderer.removeClass(document.body, 'is-preload'); // Nettoyage au changement de page
    }
  }
}
