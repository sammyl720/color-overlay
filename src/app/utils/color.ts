import { ParamMap } from "@angular/router";
import { IColorState } from "../models/color.model";
import { initialState } from "../state/color.reducer";

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
    resultHexCode += Math.round(opacity * parseInt(color[i], 16) + (1 - opacity) * parseInt(bgColor[i], 16)).toString(16).padStart(2, '0');
  }

  return resultHexCode;
}

export function getMixedColor(state: IColorState) {
  const { overlay, background, opacity } = state;
  return lightenColorWithoutAlpha(overlay, background, opacity);
}

export function isHexColor(color?: string): color is string {
  return !!color && REGEX_HEX_COLOR.test(color);
}

export function generateLink(state: IColorState) {
  const url = new URL(window.location.origin);

  setIfNotDefault('textColor', 'text-color', state, url.searchParams);
  setIfNotDefault('background', 'background-color', state, url.searchParams)
  setIfNotDefault('overlay', 'overlay-color', state, url.searchParams);
  setIfNotDefault('opacity', 'opacity', state, url.searchParams);
  setIfNotDefault('text', 'text', state, url.searchParams);

  return url.toString();
}

const setIfNotDefault = (field: keyof IColorState, paramField: string, currentState: IColorState, searchParams: URLSearchParams) => {
  if (currentState[field] !== initialState[field]) {
    searchParams.set(paramField, currentState[field].toString());
  }
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

  const param = params.get('opacity');
  if (param !== null) {
    const opacity = Number(param);
    if (isValidOpacity(opacity)) {
      partialState.opacity = opacity;
    }
  }

  const text = params.get('text');
  if (!!text) {
    partialState.text = text;
  }

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

  if (!!stateField && paramValue && isHexColor(paramValue)) {
    state[stateField] = paramValue;
  }
}

function isValidOpacity(opacity: number) {
  return !isNaN(opacity) && opacity >= 0 && opacity <= 1;
}
