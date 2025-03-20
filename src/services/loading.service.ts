import { signal } from "@angular/core";

export class LoadingService {
  private loadingSignal = signal(false);

  isLoading = this.loadingSignal.asReadonly();
  
  protected setLoading(loading: boolean) {
    this.loadingSignal.set(loading);
  }
}