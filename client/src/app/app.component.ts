import { Component } from '@angular/core';

/**
 * Cannot be standalone until @state.done error is resolved with NGXS (see notes in app.module)
 * 4/6/2023
 */
@Component({
	selector: 'app-root',
	// standalone: true,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	// imports: [RouterModule]
})
export class AppComponent {}
