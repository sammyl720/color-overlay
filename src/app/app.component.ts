import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CodeContentService } from './services/code-content.service';
import { selectFullState } from './state/color.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'colorizer';

  htmlText$: Observable<string>;
  cssText$: Observable<string>;


  constructor(
    private store: Store,
    private codeContentService: CodeContentService
  ) {
    const fullState = this.store.select(selectFullState);
    this.htmlText$ = fullState.pipe(map(this.codeContentService.getHTMLTextContent));
    this.cssText$ = fullState.pipe(map(this.codeContentService.getCSSTextContent));
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
}
