import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MovieModel } from '@shared/models/movieModel';
import { Observable, throwError } from 'rxjs';
import { SpinnerService } from '@shared/services/spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { configs, apiPaths } from '@shared/constants';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private http: HttpClient
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

  public createMovie(movie: MovieModel): Observable<MovieModel> {
    this.spinner.show();
    return this.http.post<any>(`${configs.apiUrl}${apiPaths.createMovie}`, { movie })
    .pipe(
        tap((movieResponse) => {
        }),
        catchError((err) => {
            return throwError(err);
        }),
        finalize(() => {
            this.spinner.hide();
        })
    );
  }

}
