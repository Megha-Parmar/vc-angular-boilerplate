import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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

  @Input() title: string;
  // public set title(title: string) {
  //   this.title = title;
  // }

  @Input()
  public set svgImageData(data: any) {
    this.svgName = data.name;
    this.matIconRegistry.addSvgIcon(
      data.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(data.path)
    );
  }

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }



}
