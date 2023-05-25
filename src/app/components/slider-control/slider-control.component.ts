import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IOpacity } from 'src/app/models/color.model';

@Component({
  selector: 'app-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent {
  @Input() label: string = '';
  @Input() value: number = 0.5;

  @Output() onChange = new EventEmitter<IOpacity>();
  control = new FormControl<number>(this.value);

  sub: Subscription;

  constructor() {
    this.sub = this.control.valueChanges.subscribe((value) => {
      if (value) {
        this.onChange.emit({ opacity: value });
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
