import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {


  
  constructor() { }


   showSuccess(message: string) {
    Swal.fire('Success', message, 'success');
  }

  showError(message: string) {
    Swal.fire('Error', message, 'error');
  }

  confirmDelete(callback: () => void) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

}
