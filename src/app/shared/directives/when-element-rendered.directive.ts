import {AfterViewInit, ChangeDetectorRef, ContentChild, Directive, EventEmitter, OnInit, Output} from '@angular/core';
import {MatInput} from '@angular/material';

@Directive({
  selector: '[appWhenElementRendered]'
})
export class WhenElementRenderedDirective implements OnInit, AfterViewInit {


  @Output() hasRendered = new EventEmitter<any>();

  @ContentChild(MatInput, { static: false }) element: MatInput;

  constructor(private changeDetector: ChangeDetectorRef,) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.hasRendered.emit(this.element);
    this.changeDetector.detectChanges();
  }

}
