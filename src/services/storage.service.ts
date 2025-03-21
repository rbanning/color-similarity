import { Injectable } from '@angular/core';
import { isNullish, Nullable } from '../types';

export type StorageType = 'session' | 'local';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storeType: StorageType = 'local';
  private store!: Storage;

  constructor() {
    this.switchStorageType(this.storeType); //initialize
  }

  switchStorageType(type: StorageType) {
    this.storeType = type;
    this.store = type === 'local'
      ? window.localStorage
      : window.sessionStorage;
  }


  getItem<T>(key: string): Nullable<T> {
    const value = this.store.getItem(key);
    return this.decodeValue<T>(value);
  }

  setItem(key: string, value: unknown) {
    const encodedValue = this.encodeValue(value);
    if (encodedValue) {
      this.store.setItem(key, encodedValue);
    }
    return !isNullish(encodedValue);
  }


  protected encodeValue(value: unknown): Nullable<string> {
    try {
      const json = JSON.stringify(value);
      return btoa(json);        
    } catch (error) {
      console.warn(`Error encoding value for ${this.storeType} storage:`, {error, value});
      return null; //"silently" fail
    }
  }

  protected decodeValue<T>(value: Nullable<string>): Nullable<T> {
    if (!value) { return null; }
    try {
      const json = atob(value);
      return JSON.parse(json);        
    } catch (error) {
      console.warn(`Error decoding value from ${this.storeType} storage:`, {error, value});
      return null; //"silently" fail
    }
  }
}