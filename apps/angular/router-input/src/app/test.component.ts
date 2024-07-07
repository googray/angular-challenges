import { AsyncPipe } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent implements OnDestroy {
  @Input() testId!: string;
  @Input() permission!: string;
  @Input() user!: string;

  ngOnDestroy() {
    this.testId = '';
    this.permission = '';
    this.user = '';
  }
}
