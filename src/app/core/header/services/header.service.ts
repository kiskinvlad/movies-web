import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
  ) { }

  public dismiss(message): void {
    this.modalRef.dismiss(message);
  }

  public close(message): void {
    this.modalRef.close(message);
  }

  public open(content): void {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.getDismissReason(reason);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
