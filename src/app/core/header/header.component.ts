import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { tap, isEmpty } from 'rxjs/operators';

import { AsideService } from '@core/aside/services/aside.service';
import { User } from '@shared/models/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HeaderService } from '@core/header/services/header.service';
import { UserService } from '@shared/services/user/user.service';
import { routerPaths } from '@shared/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user: User;
  public userExist: boolean;
  public avatar: SafeUrl;
  public dropDownActive = false;
  routerPath = routerPaths;

  @observable imageChangedEvent: any = '';
  @observable croppedImage: any = '';

  constructor(
    public asideService: AsideService,
    private userService: UserService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private domSanitizer: DomSanitizer,
    private headerService: HeaderService
  ) {

  }

  @action ngOnInit() {
    this.userService.authUser.pipe(
      tap((user) => {
        this.user = user;
        if (this.user) {
          this.avatar = this.domSanitizer.bypassSecurityTrustUrl(this.user.image);
        }
      })
    ).subscribe();
  }

  @action toggleAside(): void {
    this.asideService.toggleAside();
  }

  @action logout(): void {
    this.userService.logOut();
  }

  @action fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  @action imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  public open(content) {
    this.headerService.open(content);
  }

  public close(message) {
    this.headerService.close(message);
  }

  public dismiss(message) {
    this.headerService.dismiss(message);
  }

  public imageLoaded() {
  }

  public loadImageFailed() {
  }

  public save(): void {
    this.authService.updateUser(this.user.email, this.croppedImage).subscribe(
      (user) => {
        this.userService.setUser(user);
        this.avatar = this.domSanitizer.bypassSecurityTrustUrl(user.image);
      },
      (err) => {
        this.headerService.dismiss(err.message);
      }
    );
  }
}
