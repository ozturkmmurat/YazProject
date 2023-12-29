import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationComponent } from './shared/education/education.component';
import { HomeComponent } from './shared/home/home.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './layouts/layout.module';
import { LayoutComponent } from './layouts/layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { LoginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  {path: '', component: LayoutComponent, loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
  {path: 'admin', component: AdminLayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),  canActivate:[LoginGuard], data: { roles: ['admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
