import {Component, OnInit, OnDestroy, Renderer2, Inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ContactComponent} from './pages/contact/contact.component';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ValDeLAir';

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

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
      this.loadScript('https://cdn.tailwindcss.com');
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');

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
