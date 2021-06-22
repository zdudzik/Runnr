import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RunnrGuard } from './guards/runnr.guard';

const routes : Routes =[
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), // lazy load home
    canActivate: [RunnrGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
