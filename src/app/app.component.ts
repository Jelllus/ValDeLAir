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

  async ngOnInit(): Promise<void> {
    if (typeof document !== 'undefined') {
        try {
          const scriptPromises = [
            this.loadScript('assets/index/js/jquery.min.js'),
            this.loadScript('assets/index/js/jquery.poptrox.min.js'),
            this.loadScript('assets/index/js/jquery.scrolly.min.js'),
            this.loadScript('assets/index/js/jquery.scrollex.min.js'),
            this.loadScript('assets/index/js/browser.min.js'),
            this.loadScript('assets/index/js/breakpoints.min.js'),
            this.loadScript('assets/index/js/util.js'),
            this.loadScript('assets/index/js/main.js'),
            this.loadScript('https://cdn.tailwindcss.com'),
            this.loadScript('assets/balise/js/qrcode.min.js'),
          ];

          await Promise.all([...scriptPromises]);

          // Tous les scripts/CSS sont chargés
          //this.renderer.removeClass(document.body, 'is-preload'); // ou retire un loader, etc.
          console.log('✅ Tous les scripts et CSS ont été chargés');
        } catch (err) {
          console.error('Erreur lors du chargement des assets :', err);
        }
      }
  }

  private loadCSS(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(`Erreur chargement CSS: ${href}`);
      this.renderer.appendChild(document.head, link);
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(`Erreur chargement script: ${src}`);
      this.renderer.appendChild(document.body, script);
    });
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
