import {Component, Input, OnInit, Output} from '@angular/core';
import {HelperService} from '../../service/helper.service';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() image: File;
  @Output() base64Ready = new EventEmitter<string>();

  base64Image = '';

  constructor(private helper: HelperService) {
  }

  ngOnInit(): void {
    this.helper.fileToBase64(this.image).then(base64 => {
      console.log(base64);
      this.base64Image = base64;
      this.base64Ready.emit(base64);
    });
  }
}
