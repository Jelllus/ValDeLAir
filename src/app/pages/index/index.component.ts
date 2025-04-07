import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ContactComponent} from '../contact/contact.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ContactComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
   images = [
      {
        thumb: '/assets/evenements/img/thumbs/salonIDWeekEnd.jpg',
        full: '/assets/evenements/img/fulls/salonIDWeekEnd.jpg',
        title: 'Salon ID WeekEnd'
      },
      {
        thumb: '/assets/index/img/thumbs/02.jpg',
        full: '/assets/index/img/fulls/02.jpg',
        title: 'Airchitecture II'
      },
      {
        thumb: '/assets/index/img/thumbs/03.jpg',
        full: '/assets/index/img/fulls/03.jpg',
        title: 'Air Lounge'
      },
      {
        thumb: '/assets/index/img/thumbs/04.jpg',
        full: '/assets/index/img/fulls/04.jpg',
        title: 'Carry on'
      },
      {
        thumb: '/assets/index/img/thumbs/05.jpg',
        full: '/assets/index/img/fulls/05.jpg',
        title: 'The sparkling shell'
      },
      {
        thumb: '/assets/index/img/thumbs/06.jpg',
        full: '/assets/index/img/fulls/06.jpg',
        title: 'Bent IX'
      }
    ];

    lightboxVisible = false;
    lightboxImage = '';
    currentIndex = 0;

    openLightbox(src: string) {
      this.currentIndex = this.images.findIndex(img => img.full === src);
      this.lightboxImage = src;
      this.lightboxVisible = true;
    }

    closeLightbox() {
      this.lightboxVisible = false;
      this.lightboxImage = '';
    }
    nextImage(event: MouseEvent) {
      event.stopPropagation();
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.lightboxImage = this.images[this.currentIndex].full;
    }

    previousImage(event: MouseEvent) {
      event.stopPropagation();
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.lightboxImage = this.images[this.currentIndex].full;
    }
}
