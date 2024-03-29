import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageRequest } from '../search-api.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit, OnChanges {
  @Input()
  public pageNumber: number;

  @Input()
  public pageSize: number;

  @Input()
  public total: number;

  @Output()
  public pageChanged: EventEmitter<PageRequest>;  // output всегда должен иметь тип EventEmitter

  public buttons: number[];

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 0;
    this.total = 0;
    this.pageChanged = new EventEmitter<PageRequest>();
    this.buttons = [];
  }

  public ngOnInit(): void {
    this.generateButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateButtons();
  }

  public click(buttonNumber: number): void {
    this.pageChanged.emit({
      pageNumber: buttonNumber,
      pageSize: this.pageSize
    });
  }

  private generateButtons(): void {
    const pagesCount = Math.ceil(this.total / this.pageSize);
    let arrButtons = [];
    for (let i = 1; i <= pagesCount; i++) {
      arrButtons.push(i);
    }
    this.buttons = arrButtons;
  }

}
