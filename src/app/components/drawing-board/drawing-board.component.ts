import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subscription, throttleTime } from 'rxjs';
import { IColorState } from 'src/app/models/color.model';
import { selectFullState } from 'src/app/state/color.selectors';
import { updateTextAction } from 'src/app/state/color.actions';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss']
})
export class DrawingBoardComponent {
  colorState$: Observable<IColorState>;

  stageForTextUpdate$ = new ReplaySubject<string>(1);
  stageSub: Subscription;

  constructor(private store: Store) {
    this.colorState$ = this.store.select(selectFullState);
    this.stageSub = this.stageForTextUpdate$.pipe(
      throttleTime(200)
    ).subscribe(text => {
      this.store.dispatch(updateTextAction({ text }));
    })

  }

  updateText(event: PagraphChangeEvent) {
    const text = (event.target as HTMLParagraphElement)?.innerText ?? undefined;
    if (typeof text !== 'undefined') {
      this.stageForTextUpdate$.next(text);
    }
  }

  ngOnDestroy() {
    this.stageSub.unsubscribe();
  }
}

interface PagraphChangeEvent {
  target: EventTarget | null;
}
