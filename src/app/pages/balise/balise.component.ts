import { Component, AfterViewInit } from '@angular/core';

let L: any;
if (typeof window !== 'undefined') {
  import('leaflet').then((leaflet) => {
    L = leaflet;
  });
}

@Component({
  selector: 'app-balise',
  standalone: true,
  imports: [],
  templateUrl: './balise.component.html',
  styleUrl: './balise.component.css'
})
export class BaliseComponent implements AfterViewInit {

  private map!: L.Map;

  async ngAfterViewInit(): Promise<void> {
    // Charger Leaflet dynamiquement uniquement côté client
    if (typeof window !== 'undefined') {
      const L = await import('leaflet');
      // Initialisation de la carte
      this.map = L.map('map').setView([44.09, 7.19], 12);

      // Ajout de la couche OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      // Liste des balises météo
      const balises = [
        {lat: 44.0961, lon: 7.1920, windSpeed: 10, windDeg: 220},
        {lat: 44.0889, lon: 7.2169, windSpeed: 8, windDeg: 180},
        {lat: 44.0581, lon: 7.2178, windSpeed: 12, windDeg: 135}
      ];

      // Ajout des marqueurs
      balises.forEach(balise => {
        const windIcon = L.divIcon({
          className: "wind-arrow",
          html: `<div style="
            width: 50px; height: 50px;
            display: flex; align-items: center; justify-content: center;
            transform: rotate(${balise.windDeg}deg);
            font-size: 30px; text-align: center;">
            ➤
            </div>`,
          iconSize: [50, 50]
        });

        L.marker([balise.lat, balise.lon], {icon: windIcon})
          .addTo(this.map)
          .bindPopup(`Vent: ${balise.windSpeed} m/s (${balise.windDeg}°)`);
      });
    }
  }
}
