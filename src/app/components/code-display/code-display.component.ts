import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.scss']
})
export class CodeDisplayComponent {
  @Input() label = 'Label';
  @Input() text = '';
  @Output() copyRequest = new EventEmitter<void>();
}
