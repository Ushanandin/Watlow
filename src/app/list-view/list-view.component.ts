import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent implements OnInit {
  public drinkType = '';
  public drinkListCopy: any = [];
  public drinkList: any = [];
  public pageLoader: boolean = false;
  public checked: boolean = true;
  public clearSelection: boolean = false;
  constructor(
    readonly _managementService: ManagementService,
    readonly _route: ActivatedRoute,
    readonly _router: Router
  ) {}

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      this.drinkType = params?.['type'];
    });
    this.pageLoader = true;
    this.getChoiceDrinkList();
  }

  /** get drink lists */
  getChoiceDrinkList() {
    this._managementService
      .getDrinkList(this.drinkType)
      .subscribe((res: any) => {
        this.pageLoader = false;
        this.drinkList = res?.drinks;
        this.drinkListCopy = this.drinkList;
      });
  }

  /** on change event of mat toggle */
  onChangeClick(event: any) {
    this.pageLoader = true;
    if (event?.value === 'All') {
      this.drinkList = [];
      this.drinkListCopy = [];
      this.getChoiceDrinkList();
    } else {
      if (this.drinkListCopy?.length > 0) {
        let filteredItems = [];
        filteredItems = this.drinkListCopy?.filter(
          (item: { strAlcoholic: string }) => {
            return item?.strAlcoholic === event?.value;
          }
        );

        this.drinkList = [...filteredItems];
        this.pageLoader = false;
      }
    }
  }

  /** on item click of list */
  onItemClick(item: any) {
    this._managementService.setDrinkDetails(item);
    this._managementService.setNavigated(true);
    this._router.navigate(['/detail'], {
      queryParams: {
        type: this.drinkType,
      },
    });
  }

  /** got to home */
  toHome() {
    this._router.navigate(['/home']);
  }
}
