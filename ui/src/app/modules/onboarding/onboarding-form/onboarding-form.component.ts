import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit{
  onBoardingform: any =null ;
  previewImage: string | undefined;
  imageUploaded:boolean=false;
  logoName:string="Upload your Logo"
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = `url(${e.target?.result})`;
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