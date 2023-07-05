import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServices } from 'src/app/core/services/admin.services';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
@Input() formDetails:any;

  onBoardingform: any = null;
  appUrl: string = '';
  appName: any = '';

  previewImage: any;
  imageUploaded: boolean = false;
  logoName: string = "";
  logoDownloadUrl:any='';
  logoPath:any=';'

  previewQrCode: any;
  qrUploaded: boolean = false;
  qrcodeName: string = "";
  qrDownloadUrl: any='';
  qrPath:any='';
   
  randomNumber=Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

  constructor(private fb: FormBuilder, private adminservice: AdminServices, private router: Router,
              private fireStorage: AngularFireStorage) { }

  ngOnInit() {
    this.createForm();
    if(this.formDetails && this.formDetails?.showEditButton)
    this.prepopulateFormValue();
    }
  onLibraryInput() {
    this.appUrl = this.separateWord(this.onBoardingform.get('libraryName').value)
  }
  separateWord(str: any) {
    const lowerCaseString = str.toLowerCase();
    const words = lowerCaseString.split(' ');
    const singleWord = words.join('-');
    this.appName = singleWord;
    return singleWord;
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadLogoOnFirebase(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        let url = e.target?.result;
        this.previewImage = url;
        this.imageUploaded = true;
        this.logoName = file.name
      };
      reader.readAsDataURL(file);
    } else {
      this.previewImage = undefined;
      this.imageUploaded = false;
    }
  }
  async uploadLogoOnFirebase(file:any){
    const path = `admin/${this.appName}_logo_${this.randomNumber}`
    this.logoPath=path;
    const uploadTask =await this.fireStorage.upload(path,file)
    const url = await uploadTask.ref.getDownloadURL()
    this.logoDownloadUrl=url;
  }
  removeImage() {
    this.previewImage = null;
    this.imageUploaded = false;
    this.deleteLogo();
  }
  deleteLogo() {
    const imageRef = this.fireStorage.ref(this.logoPath);
    imageRef.delete().subscribe(
      () => {
        console.log('Logo deleted successfully.');
      } );
  }
  onQrload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadQrOnFirebase(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        let url = e.target?.result;
        this.previewQrCode = url;
        this.qrUploaded = true;
        this.qrcodeName = file.name
      };
      reader.readAsDataURL(file);
    } else {
      this.previewQrCode = undefined;
      this.qrUploaded = false;
    }
  }
  async uploadQrOnFirebase(file:any){
    const path = `admin/${this.appName}_qrcode_${this.randomNumber}`;
    this.qrPath=path;
    const uploadTask =await this.fireStorage.upload(path,file)
    const url = await uploadTask.ref.getDownloadURL()
    this.qrDownloadUrl=url;
  }
  removeQr() {
    this.previewQrCode = null;
    this.qrUploaded = false;
    this.deleteQr();
  }
  deleteQr() {
    const imageRef = this.fireStorage.ref(this.qrPath);
    imageRef.delete().subscribe(
      () => {
        console.log('QR deleted successfully.');
      } );
  }
  createForm() {
    this.onBoardingform = this.fb.group({
      ownerName: ['', Validators.required],
      ownerContactNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ownerEmail: ['', [Validators.required, Validators.email]],
      libraryName: ['', Validators.required],
      libraryContactNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      libraryEmail: ['', [Validators.required, Validators.email]],
      libraryAddress: ['', Validators.required],
      upiId: ['', Validators.required],
      libraryStudentCapacity: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }
  prepopulateFormValue(){
    this.adminservice.getSingleAdminDetail().subscribe(res=>{
      const formValue=res;
      console.log("formvalue==",formValue)
      if(formValue && formValue.jsonBody){
        const initialValues = {
          ownerName: 'test user',
          ownerContactNo: '8798778776',
          ownerEmail: 'xyz@gmail.com',
          libraryName: 'vuyfyf',
          libraryContactNo: 'gold',
          libraryEmail: 'my joining reason',
          libraryAddress: 'xyz,544,maharashtra',
          upiId: '89956767@upi',
          libraryStudentCapacity: '567'
        };
        this.onBoardingform.setValue(initialValues);
        this.onBoardingform.disable();
      }
    })
  }

  onSubmit() {
    if (!this.onBoardingform.valid) {
      return
    }
    const formValues = this.onBoardingform.value;
    let adminRequest = {
      serviceName: formValues.libraryName,
      serviceType: 'library',
      appName: this.appName,
      status: 'pending',
      serviceCapacity: formValues.libraryStudentCapacity,
      jsonBody: {
        ownerName: formValues.ownerName,
        ownerContactNo: formValues.ownerContactNo,
        ownerEmail: formValues.ownerEmail,
        libraryName: formValues.libraryName,
        libraryContactNo: formValues.libraryContactNo,
        libraryEmail: formValues.libraryEmail,
        libraryAddress: formValues.libraryAddress,
        upiId:formValues.upiId,
        libraryStudentCapacity: formValues.libraryStudentCapacity,
        logo: this.logoDownloadUrl,
        qrCode:this.qrDownloadUrl
      }
    };

    this.adminservice.createAdmin(adminRequest).subscribe(res => {
      this.router.navigate(['/payment']);
    });

  }
}