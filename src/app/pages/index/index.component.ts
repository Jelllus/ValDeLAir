import {Component, OnInit, OnDestroy, Renderer2, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      //css
      this.loadCSS('assets/index/css/main.css');
      this.loadCSS('assets/index/css/noscript.css');
      this.loadCSS('assets/index/css/fontawesome-all.min.css');

      //script
      this.loadScript('assets/index/js/jquery.min.js');
      this.loadScript('assets/index/js/jquery.poptrox.min.js');
      this.loadScript('assets/index/js/jquery.scrolly.min.js');
      this.loadScript('assets/index/js/jquery.scrollex.min.js');
      this.loadScript('assets/index/js/browser.min.js');
      this.loadScript('assets/index/js/breakpoints.min.js');
      this.loadScript('assets/index/js/util.js');
      this.loadScript('assets/index/js/main.js');

      this.renderer.addClass(document.body, 'is-preload');
    }
  }

  private loadCSS(href: string): void {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    this.document.head.appendChild(link);
  }

  private loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.async = true;
    this.document.body.appendChild(script);
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
