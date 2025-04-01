import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeries.component.html',
  styleUrl: './galeries.component.css'
})
export class GaleriesComponent implements OnInit {
  years = [2024, 2023, 2022, 2021, 2020]; // Liste d'années
  selectedYear?: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const year = params.get('year');
      this.selectedYear = year ? +year : undefined;
    });
  }

    goToYear(year: number) {
      this.router.navigate(['/galeries', year]); // Redirection dynamique
    }
}
