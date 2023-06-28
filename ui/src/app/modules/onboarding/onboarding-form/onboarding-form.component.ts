import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit{
  onBoardingform: any =null ;
  previewImage: any;
  imageUploaded:boolean=false;
  logoName:string=""
  appUrl:string=''

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }
  removeImage(){
  this.previewImage=null;
  this.imageUploaded=false;
  }
  onLibraryInput(){
    this.appUrl=this.separateWord(this.onBoardingform.get('libraryName').value)
  }
  separateWord(str:any) {
    const lowerCaseString = str.toLowerCase();
    const words = lowerCaseString.split(' ');
    const singleWord = words.join('-');
    return singleWord;
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let url= e.target?.result;
        this.previewImage =url;
        this.imageUploaded=true;
        this.logoName=file.name
      };
      reader.readAsDataURL(file);
    } else {
      this.previewImage = undefined;
      this.imageUploaded=false;
    }
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
      libraryStudentCapacity: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }
 
  onSubmit() {
/*     if (this.form.valid) {
      console.log(this.form.value);
    } */
  }
}