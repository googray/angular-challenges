import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      (addEvent)="addItem()"
      customClass="bg-light-yellow">
      <img src="assets/img/city.png" width="200px" />
      <ng-template #listView let-item>
        <app-list-item (deleteEvent)="deleteItem(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [NgFor, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addItem() {
    this.store.addOne(randomCity());
  }
}
