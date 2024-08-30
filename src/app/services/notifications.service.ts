import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar : MatSnackBar) { }


  showSuccess(message:string):void{
    this.snackBar.open(message,'close',{
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom',
      panelClass:'success-snackbar'
    })

  }

  showError(message:string):void{
    this.snackBar.open(message,'close',{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'bottom',
      panelClass:'erroro-snackbar'
    })

  }
}
