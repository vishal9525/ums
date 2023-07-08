import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServices } from 'src/app/core/services/admin.services';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
@Input() formDetails:any;

  buttonType='Submit';
  adminForm: any = null;
  appName: any = '';
  viewMode:boolean=false;
  appNameError:boolean=false;


  logoUploaded: boolean = false;
  logoDownloadUrl:any=null;

  qrUploaded: boolean = false;
  qrDownloadUrl: any=null;


  constructor(private fb: FormBuilder, private adminservice: AdminServices, private router: Router,
              private fireStorage: AngularFireStorage, private authService:AuthService) { }

  ngOnInit() {
    this.createForm();
    if(this.formDetails && this.formDetails?.showEditButton){
      this.prepopulateFormValue();
    }
    }
    
  onLibraryInput() {
   // this.separateWord(this.adminForm.get('libraryName').value)
  }
  separateWord(str: any) {
    const lowerCaseString = str.toLowerCase();
    const words = lowerCaseString.split(' ');
    const singleWord = words.join('-');
    this.appName = singleWord;
    return singleWord;
  }
  onLogoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadLogoOnFirebase(file);
    } else {
      this.logoUploaded = false;
    }
  }
  async uploadLogoOnFirebase(file:any){
    const path = `admin/${this.appName}_logo`
    const uploadTask =await this.fireStorage.upload(path,file)
    const url = await uploadTask.ref.getDownloadURL()
    this.logoDownloadUrl=url;
    this.logoUploaded = true;
  }
  removeLogo() {
    this.logoDownloadUrl=null;
    this.logoUploaded = false;
    this.deleteLogo();
  }
  deleteLogo() {
    const imageRef = this.fireStorage.ref(`admin/${this.appName}_logo`);
    imageRef.delete().subscribe(
      () => {
        console.log('Logo deleted successfully.');
      } );
  }
  onQrload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadQrOnFirebase(file);
    } else {
      this.qrUploaded = false;
    }
  }
  async uploadQrOnFirebase(file:any){
    const path = `admin/${this.appName}_qrcode`;
    const uploadTask =await this.fireStorage.upload(path,file)
    const url = await uploadTask.ref.getDownloadURL()
    this.qrDownloadUrl=url;
    this.qrUploaded = true;
  }
  removeQr() {
    this.qrDownloadUrl = null;
    this.qrUploaded = false;
    this.deleteQr();
  }
  deleteQr() {
    const imageRef = this.fireStorage.ref(`admin/${this.appName}_qrcode`);
    imageRef.delete().subscribe(
      () => {
        console.log('QR deleted successfully.');
      } );
  }
  createForm() {
    this.adminForm = this.fb.group({
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
    this.viewMode=true;
    this.adminservice.getSingleAdminDetail().subscribe(res=>{
      const formValue=res;
      console.log("formvalue==",formValue)
      if(formValue && formValue.jsonBody){
        if(this.formDetails && this.formDetails?.otherForm){
          this.checkForActivation(formValue);
        }
        const initialValues = {
          ownerName: formValue.jsonBody.ownerName,
          ownerContactNo: formValue.jsonBody.ownerContactNo,
          ownerEmail: formValue.jsonBody.ownerEmail,
          libraryName: formValue.jsonBody.libraryName,
          libraryContactNo:formValue.jsonBody.libraryContactNo,
          libraryEmail: formValue.jsonBody.libraryEmail,
          libraryAddress: formValue.jsonBody.libraryAddress,
          upiId: formValue.jsonBody.upiId,
          libraryStudentCapacity: formValue.jsonBody.libraryStudentCapacity
        };
        this.adminForm.setValue(initialValues);
        this.adminForm.disable();
        this.appName=formValue.appName;
        this.qrDownloadUrl = formValue.jsonBody.qrCode;
        this.qrUploaded = true;
        this.logoDownloadUrl = formValue.jsonBody.logo;
        this.logoUploaded = true;
      }
    })
  }
  onEdit(){
    this.buttonType='Submit';
    this.adminForm.enable();
    this.viewMode=false;
  }
  onView(){
    this.prepopulateFormValue();
  }
  editAppName(event:any){
    let value=event.target.value
    const regex = /^[a-zA-Z0-9-]+$/;
    if(regex.test(value)){
      this.appName=event.target.value;
      this.appNameError=false;
    }
    else{
     this.appNameError=true;
    }
  }
checkForActivation(formValue:any){
  if(formValue.status=='active'){
    this.buttonType='Deactivate'
  }else{
    this.buttonType='Activate'
  }
}
  onSubmit() {
    if(this.buttonType!=='Submit'){
      if(this.buttonType=='Deactivate'){
         this.adminservice.updateAdminStatus('pending').subscribe(res=>{
         this.router.navigate([`/${this.authService.getAppName()}/dashboard`])
         })
      }else{
        this.adminservice.updateAdminStatus('active').subscribe(res=>{
          this.router.navigate([`/${this.authService.getAppName()}/dashboard`])
         })
      }
    }else{
      if (!this.adminForm.valid) {
        return
       }
      const formValues = this.adminForm.value;
      let adminRequest = {
        serviceName: formValues.libraryName,
        serviceType: formValues.serviceType,
        appName: this.appName,
        status: formValues.status,
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
      this.adminservice.updateAdminDetails(adminRequest).subscribe(res=>{
        this.router.navigate([`/${this.authService.getAppName()}/dashboard`])
       })
    }
  }
}