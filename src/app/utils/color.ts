import { ParamMap } from "@angular/router";
import { IColorState } from "../models/color.model";

export const REGEX_HEX_COLOR = /^#[0-9A-F]{6}$/i;

/** @description
 * Apply opacity to a given color and flatten that color
 * so the background doesn't change the final color when in use.
 * Inspired from https://filosophy.org/code/online-tool-to-lighten-color-without-alpha-channel/ */
export function lightenColorWithoutAlpha(hexColor: string, hexBgColor: string, opacity: number): string | null {
  if (!isHexColor(hexColor) || !isHexColor(hexBgColor)) {
    return null;
  }

  const color = hexColor.match(/[^#]./g)!;
  const bgColor = hexBgColor.match(/[^#]./g)!;

  let resultHexCode = '#';

  for (let i = 0; i < color.length; i++) {
    resultHexCode += Math.round(opacity * parseInt(color[i], 16) + (1 - opacity) * parseInt(bgColor[i], 16)).toString(16);
  }

  return resultHexCode;
}

export function isHexColor(color?: string): color is string {
  return !!color && REGEX_HEX_COLOR.test(color);
}

export function generateLink(state: IColorState) {
  const url = new URL(window.location.origin);

  url.searchParams.set('text-color', state.textColor);
  url.searchParams.set('background-color', state.background);
  url.searchParams.set('overlay-color', state.textColor);
  url.searchParams.set('opacity', state.opacity.toString());
  url.searchParams.set('text', state.text);

  return url.toString();
}

export function getPartialStateFromQueryParams(params: ParamMap): Partial<IColorState> {
  const partialState: Partial<IColorState> = {};
  trySetColorFieldFromParamMap({
    fields: { stateField: 'background', paramField: 'background-color' },
    paramMap: params,
    state: partialState
  })
  trySetColorFieldFromParamMap({
    fields: { stateField: 'textColor', paramField: 'text-color' },
    paramMap: params,
    state: partialState
  })
  trySetColorFieldFromParamMap({
    fields: { stateField: 'overlay', paramField: 'overlay-color' },
    paramMap: params,
    state: partialState
  })
  const opacity = Number(params.get('opacity'));
  if (isValidOpacity(opacity)) {
    partialState.opacity = opacity;
  }

  const text = params.get('text');
  if (!!text) {
    partialState.text = text;
  }
  console.log(partialState);
  return partialState;
}

export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type StringOnlyState = Pick<IColorState, StringKeys<IColorState>>;

type ParamStateFieldPair = {
  stateField: keyof StringOnlyState;
  paramField: string;
}

type ISetParamColor = {
  fields: ParamStateFieldPair,
  paramMap: ParamMap,
  state: Partial<IColorState>
};

function trySetColorFieldFromParamMap(options: ISetParamColor) {
  const { fields: { stateField, paramField }, paramMap, state } = options;
  const paramValue = paramMap.get(paramField);
  console.log(stateField, paramField, paramValue)

  if (!!stateField && paramValue && isHexColor(paramValue)) {
    state[stateField] = paramValue;
  }
}

function isValidOpacity(opacity: number) {
  return !isNaN(opacity) && opacity >= 0 && opacity <= 1;
}
