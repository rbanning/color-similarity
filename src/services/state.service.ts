import { Injectable, signal } from '@angular/core';
import { IAppState } from '../models/app-state.model';
import { ColorTuple } from '../types';
import { StorageService } from './storage.service';

export const initialState: IAppState = {
  distanceFormula: 'euclidean',
  colorHistory: []
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly STATE_KEY = 'app-state';
  private readonly MAX_COLOR_HISTORY = 5;
  private storage = new StorageService();   //create a new instance  
  
  private _state = signal<IAppState>(initialState);

  state = this._state.asReadonly();


  constructor() {
    this.storage.switchStorageType('local'); //ensure we are using local storage
    this.loadState();
  }


  addColor(color: ColorTuple) {
    const colors = this.state().colorHistory;
    const newColors = [color, ...colors];
    if (newColors.length > this.MAX_COLOR_HISTORY) {
      newColors.splice(this.MAX_COLOR_HISTORY - newColors.length);
    }
    return this.updateState({ colorHistory: newColors });
  }

  setDistanceFormula(formula: IAppState['distanceFormula']) {
    return this.updateState({ distanceFormula: formula });
  }

  updateState(state: Partial<IAppState>) {
    this._state.update((prev) => ({
      ...prev,
      ...state
    }));
    this.saveState();
    return this.state();
  }

  private loadState() {
    const state = this.storage.getItem<IAppState>(this.STATE_KEY);
    if (state) {
      this.updateState(state);
    }
  }

  private saveState() {
    this.storage.setItem(this.STATE_KEY, this.state());
  }
}