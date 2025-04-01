import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit() {}

  ngAfterViewInit() {

    this.initBurgerMenu();
  }

  private initBurgerMenu() {
    if (typeof document === 'undefined') return; // Empêche l'erreur en SSR

    const burgerBtn = document.querySelector('.burger-btn') as HTMLElement;
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
    const menuOverlay = document.querySelector('.menu-overlay') as HTMLElement;

    if (!burgerBtn || !mobileMenu || !menuOverlay) {
      console.error("Les éléments du menu burger ne sont pas trouvés !");
      return;
    }

    function toggleMenu() {
      burgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');

      // Mettre à jour l'attribut aria-expanded
      const isExpanded = burgerBtn.classList.contains('active');
      burgerBtn.setAttribute('aria-expanded', String(isExpanded));

      // Empêcher le défilement du body quand le menu est ouvert
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    }

    burgerBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }
}
