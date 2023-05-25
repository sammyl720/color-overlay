import { Injectable } from '@angular/core';
import { IColorState } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class CodeContentService {

  constructor() { }

  getHTMLTextContent(state: IColorState) {
    const { text } = state;
    return `
<div class="card">
  <div class="card__background">
    <div class="card__overlay"></div>
    <p class="card__text">
      ${text}
    </p>
  </div>
</div>
`;
  }

  getCSSTextContent(state: IColorState) {
    const { background, overlay, textColor, opacity } = state;
    return `
// import poppins font
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,500;0,600;0,700;1,600&display=swap');

.card {
  width: 100%;
  padding: 6px 12px;
  margin: 12px 6px;
  margin-top: 32px;
  max-width: max(800px, 75vw);
}

.card__background {
  padding: 1rem;
  border-radius: 4px;
  position: relative;
  box-shadow: 5px 12px 12px rgba(0, 0, 0, 0.14);
}

.card__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.card__text {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  z-index: 2;
}
`;
  }
}
