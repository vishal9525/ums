import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BreadcrumbsNavComponent } from './components/breadcrumbs-nav/breadcrumbs-nav.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [
       HeaderComponent,
       FooterComponent,
       SidebarComponent,
       DialogComponent,
       BreadcrumbsNavComponent,
       PaymentComponent,
       AdminFormComponent,
       UserFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    HeaderComponent,
    AdminFormComponent,
    UserFormComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsNavComponent
  ]
})
export class SharedModule { }
