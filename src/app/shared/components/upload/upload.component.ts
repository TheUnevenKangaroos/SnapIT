import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../../core/auth.service';
import * as files from 'lodash';

import { Component, OnInit } from '@angular/core';

import { DEFAULT_SELECT_STATUS } from '../../constants';
import { FileItem } from '../../models/file';
import { Image } from './../../models/image';
import { ImageService } from './../../../core/image.service';
import { Upload as UploadService } from '../../../core/upload.service';
import { categoriesList } from './../../enums/categories.enum';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public filesToUpload: FileList;
  public uploadedFiles: Array<FileItem>;
  public currentFile: FileItem;
  public selectStatus: string;
  public user: any;
  public uid: string;
  public author: string;
  uploadForm: FormGroup;
  public listOfCategories = categoriesList();
  fileUploadedToDB = false;
  imageSavedToDB = false;
  public images;
  public image;

  constructor(private imageService: ImageService,
    private uploadServise: UploadService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.selectStatus = DEFAULT_SELECT_STATUS;
    this.uploadedFiles = new Array<FileItem>();
    console.log(this.uploadedFiles);
  }
  ngOnInit() {
    // Called after the constructor, initializing input properties,
    // and the first call to ngOnChanges. Add 'implements OnInit' to the class.
    this.uid = this.authService.currentUserId;
    this.user = this.authService.getUser(this.uid);
    this.user.subscribe((userData) => {
      this.author = userData.name;
      console.log(userData);
    });
    this.images = this.imageService.getImagesList();
    this.images.subscribe((imageList) => {
      this.image = imageList[imageList.length - 1];
      // console.log(this.image);
    });
    this.buildForm();

  }

  handleFiles(event) {
    this.filesToUpload = event.target.files;
    this.selectStatus = this.filesToUpload.length > 1
      ? this.filesToUpload.length + ' files selected.'
      : this.filesToUpload[0].name;
  }

  uploadFiles() {
    const filesIndexes = files.range(this.filesToUpload.length);
    files.each(filesIndexes, (idx) => {
      this.currentFile = new FileItem(this.filesToUpload[idx]);
      this.uploadServise.uploadImagesToFirebase(this.currentFile);
      this.uploadedFiles.push(this.currentFile);
    });
    this.fileUploadedToDB = true;
    this.imageSavedToDB = false;
  }

  saveImage() {
    console.log(this.uploadForm.value.title);
    console.log(this.uploadForm.value.description);
    console.log(this.uploadForm.value.categorie);

    const image = new Image();
    image.author = this.author;
    image.title = this.uploadForm.value.title;
    image.description = this.uploadForm.value.description;
    image.categorie = this.uploadForm.value.categorie;
    image.url = this.uploadedFiles[0].url;
    this.imageService.saveImage(image);
    this.imageSavedToDB = false;
    this.fileUploadedToDB = false;
    // console.log(this.image.$key);
    this.router.navigate([`/image/${this.image.$key}`]);
  }

  deleteFile(name: string) {
    this.uploadServise.deleteUpload(name)
      .then(() => {
        this.uploadedFiles = this.uploadedFiles.filter(f => f.file.name !== name);
      });
    this.fileUploadedToDB = !this.fileUploadedToDB;
  }
  buildForm(): void {
    this.uploadForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'categorie': new FormControl('Other', [Validators.required])
    });
    this.uploadForm.valueChanges.subscribe((value) => console.log(value));
    this.uploadForm.statusChanges.subscribe((value) => console.log(value));
  }
}