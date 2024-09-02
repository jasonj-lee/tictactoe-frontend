import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  player: String
}

@Component({
  selector: 'win-popup',
  templateUrl: './win-popup.component.html',
  styleUrls: ['./win-popup.component.css'],
  standalone: true
})
export class WinPopupComponent {
  readonly dialogRef = inject(MatDialogRef<WinPopupComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  closeWin(): void {
    this.dialogRef.close();
  }
}
