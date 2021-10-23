import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';

const routes: Routes = [
  {
    path: './newReleases',
    component: NewReleasesComponent,
  },
  { path: './about', component: AboutComponent },
  {
    path: '',
    redirectTo: 'newReleases',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
