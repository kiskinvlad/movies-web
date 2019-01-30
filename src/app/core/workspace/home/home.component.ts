import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { User } from '../../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '@core/workspace/services/workspace.service';
import { action, observable } from 'mobx-angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MovieModel } from '@shared/models/movieModel';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: User;
  public movies: any[];
  public movieForm: FormGroup;
  public errorMessage: string;
  public day: number;
  public month: number;
  public year: number;

  private date: Date;

  @observable imageChangedEvent: any = '';
  @observable croppedImage: any = '';
  @observable submitted = false;

  fileInputRef: ElementRef | any;


  constructor(private activatedRoute: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private chRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.date = new Date();
    this.month = this.date.getUTCMonth() + 1;
    this.day = this.date.getUTCDate();
    this.year = this.date.getUTCFullYear();

    this.movieForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      released: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
    this.movies = [{id: 1, name: 'One'}, {id: 2, name: 'Two'}, {id: 3, name: 'Three'}, {id: 4, name: 'Four'}, {id: 5, name: 'Five'}];
    this.user = this.activatedRoute.snapshot.data.user;
  }

  public open(content) {
    if (this.fileInputRef) {
      this.fileInputRef.value = null;
    }
    this.workspaceService.open(content);
  }

  public close(message) {

    this.workspaceService.close(message);
  }

  public dismiss(message) {
    this.workspaceService.dismiss(message);

  }

  @action fileChangeEvent(event: any, fileRef: ElementRef): void {
    this.fileInputRef = fileRef;
    this.imageChangedEvent = event;
  }

  @action imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  public imageLoaded() {
  }

  public loadImageFailed() {
  }

  @action onSubmit(): void {
    this.submitted = true;
    if (this.movieForm.invalid) {
      return;
    }
    const date = new Date(
      this.movieForm.value.released.year,
      this.movieForm.value.released.month - 1,
      this.movieForm.value.released.day
    );
    const reqData: MovieModel = {
      name: this.movieForm.value.name,
      genre: this.movieForm.value.genre,
      released: date,
      description: this.movieForm.value.description,
      image: this.croppedImage || null,
      addedBy: this.userService.user
    };
    console.log(reqData);
    this.workspaceService.createMovie(reqData).subscribe(
      (movie) => {
        this.chRef.markForCheck();
      },
      (error) => {
        if (error.name === 'USER_EMAIL_EXIST') {
          this.errorMessage = error.name;
          this.chRef.markForCheck();
        }
      }
    );
  }

}
