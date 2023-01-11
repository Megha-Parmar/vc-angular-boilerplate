import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonMaterialModule } from './../core/common-material.module';
import { LayoutMaterialModule } from './../core/layout-material.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const CoreLayoutComponent = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
];

@NgModule({
  declarations: [
    CoreLayoutComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    LayoutMaterialModule,
    CommonMaterialModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    TranslateModule
  ],
  exports: [
    CoreLayoutComponent,
    LayoutMaterialModule,
    CommonMaterialModule,
    MatSidenavModule,
    MatListModule,
    TranslateModule
  ],
})
export class LayoutModule { }
