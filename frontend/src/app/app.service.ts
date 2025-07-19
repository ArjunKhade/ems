import { Injectable, signal } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isHandset$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isWeb$: Observable<boolean>;

   private _searchTerm = signal('');
  searchTerm = this._searchTerm.asReadonly(); 
  
   constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isTablet$ = this.breakpointObserver.observe([Breakpoints.Tablet])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isWeb$ = this.breakpointObserver.observe([Breakpoints.Web])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

   setSearchTerm(term: string) {
    this._searchTerm.set(term);
  }

}
