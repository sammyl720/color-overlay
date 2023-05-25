import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IColor } from 'src/app/models/color.model';

@Component({
  selector: 'app-color-control',
  templateUrl: './color-control.component.html',
  styleUrls: ['./color-control.component.scss']
})
export class ColorControlComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Output() onChange = new EventEmitter<IColor>();
  control = new FormControl<string>(this.value);

  sub: Subscription;

  constructor() {
    this.sub = this.control.valueChanges.subscribe((value) => {
      if (value) {
        this.onChange.emit({ color: value });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && changes['value'].currentValue !== this.control.value) {
      this.control.setValue(changes['value'].currentValue);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
