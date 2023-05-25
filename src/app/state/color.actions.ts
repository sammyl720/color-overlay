import { createAction, props } from '@ngrx/store';
import { IColor, IColorState, IOpacity } from '../models/color.model';

export const updateBackgroundAction = createAction('[Background] Update', props<IColor>())
export const updateOverlayAction = createAction('[Overlay] Update', props<IColor>())
export const updateTextColorAction = createAction('[Text Color] Update', props<IColor>())
export const updateTextAction = createAction('[Text] Update', props<{ text: string }>())
export const updateOpacityAction = createAction('[Opacity] Update', props<IOpacity>());
export const updatePartialState = createAction('[Partial state] update', props<Partial<IColorState>>());

export const resetAction = createAction('Reset');
