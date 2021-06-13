import { NgModule } from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgxLetterImageAvatarModule } from 'ngx-letter-image-avatar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatSelectModule} from '@angular/material/select';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  declarations: [],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    FontAwesomeModule,
    MatToolbarModule,
    NgxLetterImageAvatarModule,
    MatSidenavModule,
    MaterialFileInputModule,
    MatSelectModule,
    MatFileUploadModule
  ]
})
export class AppMaterialModule { }
