import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-holder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.css'],
})
export class PlaceHolderComponent {
  path: string;

  constructor(private route: ActivatedRoute) {
    this.path = this.route.snapshot.url.join('/');
  }
}
