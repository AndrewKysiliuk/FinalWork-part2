import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
} from '@angular/material';
import {TruncatePipePipe} from './Pipe/truncate-pipe.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';

const materialModule = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  ScrollingModule,
];

@NgModule({
  declarations: [TruncatePipePipe],
  imports: [
    CommonModule, materialModule, FormsModule,
    ReactiveFormsModule,
  ],
  exports: [materialModule, TruncatePipePipe, FormsModule,
    ReactiveFormsModule],
})
export class ShareModule {
}
