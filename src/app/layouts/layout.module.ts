import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonMaterialModule } from './../core/common-material.module';
import { LayoutMaterialModule } from './../core/layout-material.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    LayoutMaterialModule,
    CommonMaterialModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutMaterialModule,
    CommonMaterialModule,
    MatSidenavModule,
    MatListModule,
  ],
})
export class LayoutModule { }
