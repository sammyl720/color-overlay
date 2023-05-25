import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IColorState } from "../models/color.model";
import { generateLink, getMixedColor } from "../utils";
export const colorFeature = createFeatureSelector<IColorState>('colors');

export const selectFullState = createSelector(
  colorFeature,
  (state: IColorState) => state
);

export const selectBackgroundColor = createSelector(
  colorFeature,
  (state: IColorState) => state.background
);

export const selectOverlayColor = createSelector(
  colorFeature,
  (state: IColorState) => state.overlay
);

export const selectUrlWithParams = createSelector(
  colorFeature,
  state => generateLink(state)
);

export const selectText = createSelector(
  colorFeature,
  (state: IColorState) => state.text
);

export const selectOpacity = createSelector(
  colorFeature,
  (state: IColorState) => state.opacity
);

export const selectTextColor = createSelector(
  colorFeature,
  (state: IColorState) => state.textColor
);

export const selectColorCombo = createSelector(
  colorFeature,
  getMixedColor
);
