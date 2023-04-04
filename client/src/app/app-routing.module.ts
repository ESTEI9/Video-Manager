import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { VideoManagerComponent } from './common/components/video-manager/video-manager.component';
import { ManagerGuard } from './common/guards/view-manager.guard';

const routes: Routes = [
	{ path: '', component: LoginComponent, pathMatch: 'full' },
	{ path: '**', redirectTo: ''},
	{ path: 'videos', component: VideoManagerComponent, canActivate: [ManagerGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
