import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonMaterialModule } from 'src/app/core/common-material.module';
import { AdminCoreModule } from 'src/app/core/core.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CommonMaterialModule,
    AdminCoreModule,
    TranslateModule,
  ],
})
export class ProfileModule { }
