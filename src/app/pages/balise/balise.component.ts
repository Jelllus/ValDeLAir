import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

declare let L: any;
declare var QRCode: any; // Déclare la lib QRCode globalement

if (typeof window !== 'undefined') {
  import('leaflet').then((leaflet) => {
    L = leaflet;
  });
}

interface Balise {
  idBalise: string;
  external_device_id: string;
  nom: string;
  latitude: string;
  longitude: string;
  altitude: string;
  departement: string;
  contact_name: string;
  contact_phone: string;
  contact_email_adr: string;
  url_picture: string;
  station_type: string;
}

@Component({
  selector: 'app-balise',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './balise.component.html',
  styleUrl: './balise.component.css'
})
export class BaliseComponent implements OnInit, AfterViewInit {
  @ViewChildren('qrcodeContainer') qrcodeContainers!: QueryList<ElementRef>;
  private map!: L.Map;

  balises: Balise[] = [];
  private apiMeteo = 'https://data.ffvl.fr/api/?base=balises&r=releves_meteo&key=9a246aaff1789ca174c65f86f1dc035c'; // infos météo
  private apiBalises = 'https://data.ffvl.fr/api/?base=balises&r=list&mode=json&key=9a246aaff1789ca174c65f86f1dc035c'; // infos balises (coordonnées)
  private balisesFiltre = ['192', '157', '2812'];

constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchBalises();
  }

  fetchBalises(): void {
    this.http.get<Balise[]>(this.apiBalises).subscribe(
      (data) => {
        this.balises = data.filter(balise => this.balisesFiltre.includes(balise.idBalise))
        .map(balise => ({
                  ...balise,
                  station_type: balise.station_type.toLowerCase()
                  }));
        // ✅ Vue mise à jour → éléments #qrcodeContainer prêts
        this.cdr.detectChanges();

        // ✅ QR codes générés après rendu
        this.generateQRCodes();
      },
      (error: any) => console.error('Erreur lors de la récupération des balises', error)
    );
  }

  async ngAfterViewInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      L = await import('leaflet');
      L = L.default;

      this.map = L.map('map').setView([44.09, 7.19], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      if (this.isMobile()) {
        this.restrictToTwoFingersOnMobile();
      }
      this.fetchAndDisplayBalises();
    }
  }

  private isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  private restrictToTwoFingersOnMobile(): void {
    this.map.scrollWheelZoom.disable();
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();

    const container = this.map.getContainer();

    container.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 2) {
        this.map.dragging.enable();
        this.map.touchZoom.enable();
      } else {
        this.map.dragging.disable();
        this.map.touchZoom.disable();
      }
    });

    container.addEventListener('touchend', () => {
      this.map.dragging.disable();
      this.map.touchZoom.disable();
    });
  }

  async fetchAndDisplayBalises() {
    try {
      // Effectuer les deux appels API en parallèle
      const [balisesResponse, meteoResponse] = await Promise.all([
        fetch(this.apiBalises),
        fetch(this.apiMeteo)
      ]);

      const balisesData = await balisesResponse.json();
      const meteoData = await meteoResponse.json();

      this.displayBalises(balisesData, meteoData);
    } catch (error) {
      console.error("Erreur lors de la récupération des balises météo :", error);
    }
  }

  displayBalises(balisesData: any[], meteoData: any[]) {
    // Filtrer uniquement les balises utiles
    const balisesFiltrees = balisesData.filter((balise: any) =>
      this.balisesFiltre.includes(balise.idBalise.toString())
    );

    balisesFiltrees.forEach((balise: any) => {
       const meteo = meteoData.find((m: any) =>
              m.idbalise.toString() === balise.idBalise.toString() // idbalise côté API météo
            );
      if (!meteo) return; // Si pas de données météo, on ignore

      const lat = parseFloat(balise.latitude);
      const lon = parseFloat(balise.longitude);
      const windSpeed = parseInt(meteo.vitesseVentMoy, 10);
      const windDeg = parseInt(meteo.directVentMoy, 10);

      const windIcon = L.divIcon({
        className: "wind-arrow",
        html: `<div style="
          width: 50px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          transform: rotate(${windDeg}deg);
          position: relative;">

          <div style="
              width: 60px; height: 25px;
              display: flex;
              border-radius: 5px;
              box-shadow: 0 0 3px rgba(0,0,0,0.5);
              clip-path: polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%);">

              <div style="flex: 1; background: red;"></div>
              <div style="flex: 1; background: white;"></div>
              <div style="flex: 1; background: red;"></div>
              <div style="flex: 1; background: white;"></div>
              <div style="flex: 1; background: red;"></div>
          </div>
        </div>`,
        iconSize: [50, 50]
      });

      L.marker([lat, lon], {icon: windIcon})
        .addTo(this.map)
        .bindPopup(`
        ${balise.nom} <br>
        Vent: ${windSpeed} km/h <br>
        Direction: (${windDeg}°)
        ${meteo.temperature !== null ? `Température: ${meteo.temperature}°C` : ''}
                    `);
    });
  }

  generateQRCodes(): void {
    this.qrcodeContainers.forEach((qrcodeContainer, index) => {
      const balise = this.balises[index];
      if (!balise) return; // Sécurité en cas de désynchronisation

      new QRCode(qrcodeContainer.nativeElement, {
        text: `https://www.balisemeteo.com/balise.php?idBalise=${balise.idBalise}`,
        width: 200,
        height: 200
      });
    });
  }
}
