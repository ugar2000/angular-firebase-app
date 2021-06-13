import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../service/helper.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() image: File;

  base64Image = '';

  constructor(private helper: HelperService) {
  }

  ngOnInit(): void {
    this.helper.fileToBase64(this.image).then(base64 => {
      console.log(base64);
      this.base64Image = base64;
    });
  }
}
