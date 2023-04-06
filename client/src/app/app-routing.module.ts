import { RouterModule, Routes } from '@angular/router';
import { ManagerGuard } from './common/guards/view-manager.guard';
import { VideoService } from './common/services/video/video.service';
import { UserService } from './common/services/user/user.service';
import { LoginComponent } from './common/components/login/login.component';
import { VideoManagerComponent } from './common/components/video-manager/video-manager.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{
		path: 'videos',
		loadComponent:() => VideoManagerComponent,
		canActivate: [ManagerGuard]
	},
	{
		path: '',
		loadComponent: () => LoginComponent,
		pathMatch: 'full'
	},
	{ path: '**', redirectTo: ''},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
