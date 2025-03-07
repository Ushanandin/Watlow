import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    readonly _router: Router,
    readonly _manageservice: ManagementService
  ) {}
  title = 'CocktailForYou';

  /** Go to list view on status card click */
  goToListView(type: string) {
    this._manageservice.setNavigated(true);
    this._router.navigate(['/list'], {
      queryParams: {
        type: type,
      },
    });
  }
}
