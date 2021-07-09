import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RunnrGuard } from './guards/runnr.guard';
import { HomeComponent } from './components/home/home.component';

const routes : Routes =[
  {
    path: '',
    component: HomeComponent,
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
