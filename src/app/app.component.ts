import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { CodeContentService } from './services/code-content.service';
import { selectFullState, selectUrlWithParams } from './state/color.selectors';
import { ActivatedRoute } from '@angular/router';
import { generateLink, getPartialStateFromQueryParams, isEmptyObject } from './utils';
import { updatePartialState } from './state/color.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'colorizer';

  htmlText$: Observable<string>;
  cssText$: Observable<string>;
  linkToShare$: Observable<string>;

  canShare = typeof navigator.share !== undefined;
  subscription: Subscription;

  constructor(
    private store: Store,
    private codeContentService: CodeContentService,
    private route: ActivatedRoute
  ) {
    const fullState = this.store.select(selectFullState);
    this.htmlText$ = fullState.pipe(map(this.codeContentService.getHTMLTextContent));
    this.cssText$ = fullState.pipe(map(this.codeContentService.getCSSTextContent));

    this.subscription = this.route.queryParamMap.pipe(
      map(params => getPartialStateFromQueryParams(params)),
      filter(partialState => !isEmptyObject(partialState))
    ).subscribe(partialState => {
      this.store.dispatch(updatePartialState(partialState))
    })

    this.linkToShare$ = this.store.select(selectUrlWithParams);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async copyToClipboard(text: string) {
    try {
      const clipboard = window.navigator?.clipboard;
      if (clipboard) {
        await clipboard.writeText(text);
      }
      else {
        throw new Error('Clipboard api not available');
      }

    } catch (error) {
      console.error(error);
      alert(`Couldn't copy to clipboard`);
    }
  }

  shareLink(url: string) {
    if (this.canShare) {
      navigator.share({
        url,
        title: 'Check Out this color combo'
      })
    }
  }
}
