import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
 breadcrumbs:any=[
  {
    id: 1,
    name: 'Dashboard',
    routerLink: 'dashboard',
    active:true
  },
  {
    id: 2,
    name: 'User Details',
    routerLink: '',
    active:false
  }] 

  userDetails: any = null;
  previewImage: any;
  imageUploaded: boolean = false;
  logoName: string = ""
  appUrl: string = ''
  buttonType='Approved'

  subList=[
    {label:"Silver Plan(3 Months)", value:'silver'},
    {label:"Gold Plan(6 Months)", value:'gold'},
    {label:"Platinum Plan(1 Year)", value:'platinum'},
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.prepopulateFormValue()
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
  removeImage() {
    this.previewImage = null;
    this.imageUploaded = false;
  }

  createForm() {
    this.userDetails = this.fb.group({
      fullName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      address: ['',Validators.required],
      selectSub: ['',Validators.required],
      joiningReason: ['',Validators.required],
      dob: ['',Validators.required],
    });
  }

  prepopulateFormValue(){
    const initialValues = {
      fullName: 'test user',
      mobileNo: '8798778776',
      emailId: 'xyz@gmail.com',
      address: 'C-304, housing society ,pune, maharashtra',
      selectSub: 'gold',
      joiningReason: 'my joining reason',
      dob: new Date(),
    };

    this.userDetails.setValue(initialValues);
    this.userDetails.disable();
  }
  onEdit(){
    this.buttonType='Submit';
    this.userDetails.enable();
  }
  onSubmit() {
    /*     if (this.form.valid) {
          console.log(this.form.value);
        } */
  }
}


