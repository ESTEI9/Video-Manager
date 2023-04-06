import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));

/**
 * There is a problem with retrieving imports from ngxs modules (BrowserAnimationsModule, specifically).
 * Root component does not register imports of BrowserAnimations Module. Attempts to add the module are met by asking for CommonModule.
 * Adding the CommonModule results in @state.done not finding the BrowserAnimationsModule in the component imports (and the cycle repeats).
 *  4/6/2023
 */

// bootstrapApplication(AppComponent, {
// 	providers: [
// 		importProvidersFrom([
// 			NgxsModule.forRoot([UserState], { developmentMode: !environment.production, selectorOptions: { suppressErrors: false }}),
// 			NgxsStoragePluginModule.forRoot({ key: [UserState]}),
// 			NgxsSelectSnapshotModule.forRoot()
// 		]),
// 		provideRouter(routes),
// 		provideHttpClient(
// 			withInterceptors([VideoInterceptor])
// 		)
// 	]
// }).catch(err => console.log(err));
