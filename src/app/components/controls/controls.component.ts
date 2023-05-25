import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IColor, IColorState, IOpacity } from 'src/app/models/color.model';
import { resetAction, updateBackgroundAction, updateOpacityAction, updateOverlayAction, updateTextColorAction } from 'src/app/state/color.actions';
import { selectFullState } from 'src/app/state/color.selectors';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  state$: Observable<IColorState>;

  constructor(private store: Store) {
    this.state$ = store.select(selectFullState);
  }

  updateBackgroundColor(value: IColor) {
    this.store.dispatch(updateBackgroundAction(value))
  }

  updateOverlayColor(value: IColor) {
    this.store.dispatch(updateOverlayAction(value));
  }

  updateTextColor(value: IColor) {
    this.store.dispatch(updateTextColorAction(value));
  }

  updateOpacity(value: IOpacity) {
    this.store.dispatch(updateOpacityAction(value))
  }

  reset() {
    this.store.dispatch(resetAction())
  }
}
