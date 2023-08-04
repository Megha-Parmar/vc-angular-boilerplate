import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcon } from '@models/common.model';

@Component({
  selector: 'app-cp-svg-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cp-svg-icon.component.html',
  styleUrls: ['./cp-svg-icon.component.scss']
})
export class CpSvgIconComponent {
  @HostBinding('style.-webkit-mask-image')
  svgName: string;

  @Input()
  public set svgImageData(data: SvgIcon) {
    this.svgName = data.name;
    this.matIconRegistry.addSvgIcon(
      data.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(data.path)
    );
  }

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }
}