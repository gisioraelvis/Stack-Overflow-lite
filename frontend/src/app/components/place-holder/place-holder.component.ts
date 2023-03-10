import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-place-holder',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.css'],
})
export class PlaceHolderComponent {
  path: string;

  constructor(private route: ActivatedRoute, private location: Location) {
    this.path = this.route.snapshot.url.join('/');
  }

  goBack(): void {
    this.location.back();
  }
}
