import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ConcatenateNamePipe } from './utils/concatenate-name.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ConcatenateNamePipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ heavyComputation(person, index) }}
    </div>
    @for (person of persons; track person; let idx = $index) {
      <div>{{ person | concatenateName: idx }}</div>
    }
  `,
})
export class AppComponent {
  public persons: string[] = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
