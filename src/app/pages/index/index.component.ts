import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ContactComponent} from '../contact/contact.component';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

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
export class IndexComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

   images = [
     {
             thumb: '/assets/index/img/thumbs/5-10.jpeg',
             full: '/assets/index/img/fulls/5-10.jpeg',
             title: 'Parapente & Montagne'
           },
      {
        thumb: '/assets/evenements/img/thumbs/salonIDWeekEnd.jpg',
        full: '/assets/evenements/img/fulls/salonIDWeekEnd.jpg',
        title: 'Salon ID WeekEnd'
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

    ngOnInit(): void {
      this.titleService.setTitle('Baptême et Vol en Parapente à la Colmiane - Valdelair');
      this.metaService.updateTag({
        name: 'description',
        content: 'Découvrez le plaisir du parapente avec Valdelair : baptêmes biplace, initiation, stages et vols découverte près de la Colmiane. Réservez votre vol !'
      });
    }

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
