import { createReducer, on } from "@ngrx/store";
import { IColorState } from '../models/color.model';
import { resetAction, updateBackgroundAction, updateOpacityAction, updateOverlayAction, updateTextAction, updateTextColorAction } from "./color.actions";

export const initialState: IColorState = {
  background: '#191521',
  overlay: '#FCFAFF',
  textColor: '#705c8f ',
  opacity: 0.05,
  text: 'Combine the background color, overlay color, and opacity to get a nice visual effect'
}

export const colorReducer = createReducer(
  initialState,
  on(updateBackgroundAction, (state, args) => changeColorState(state, args, 'background')),
  on(updateOverlayAction, (state, args) => changeColorState(state, args, 'overlay')),
  on(updateTextColorAction, (state, args) => changeColorState(state, args, 'textColor')),
  on(updateOpacityAction, (state, { opacity }) => ({ ...state, opacity })),
  on(updateTextAction, (state, { text }) => ({ ...state, text })),
  on(resetAction, (state) => ({ ...initialState }))
);

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type StringOnlyState = Pick<IColorState, StringKeys<IColorState>>;

export const changeColorState = (state: IColorState, args: { color: string }, field: keyof StringOnlyState): IColorState => ({ ...state, [field]: args.color });
