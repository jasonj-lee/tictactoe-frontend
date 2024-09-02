import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  player: String
}

@Component({
  selector: 'winPopup',
  templateUrl: './winPopup.component.html',
  styleUrls: ['./winPopup.component.css'],
  standalone: true
})
export class winPopupComponent {
  readonly dialogRef = inject(MatDialogRef<winPopupComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  closeWin(): void {
    this.dialogRef.close();
  }
}
