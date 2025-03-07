import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  public recipeDetail: any;
  public type: string = '';
  constructor(
    readonly _managementService: ManagementService,
    readonly _router: Router,
    readonly _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getDrinkDetailRecipe();
    this._route.queryParams.subscribe((params) => {
      this.type = params?.['type'];
    });
  }

  /** get selected drink details */
  getDrinkDetailRecipe() {
    this._managementService.drinkDetails.subscribe((res: any) => {
      this.recipeDetail = res;
    });
  }

  /** go back to listing */
  goBack() {
    this._router.navigate(['/list'], {
      queryParams: {
        type: this.type,
      },
    });
  }
}
