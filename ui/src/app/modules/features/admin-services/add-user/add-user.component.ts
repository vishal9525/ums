import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  implements OnInit {
  breadcrumbs:any=[
    {
      id: 1,
      name: 'Add User',
      routerLink: '',
      active:false
    }
 ] 
  appExist: boolean = false;
  appId: any = ''

  registrationForm: any = null;
  previewImage: any;
  imageUploaded: boolean = false;
  logoName: string = ""
  appUrl: string = ''

  subList=[
    {label:"Silver Plan(3 Months)", value:'silver'},
    {label:"Gold Plan(6 Months)", value:'gold'},
    {label:"Platinum Plan(1 Year)", value:'platinum'},
  ]

  constructor(private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.appId = this.route.snapshot.paramMap.get('appId');
    let appArray = this.authService.getAppNameList()
    if (appArray && appArray.length > 0 && appArray.includes(this.appId)) {
      this.appExist = true
    }
    this.createForm();
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
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      address: [''],
      selectSub: [''],
      joiningReason: [''],
      dob: [''],
    });
  }

  onSubmit() {
    /*     if (this.form.valid) {
          console.log(this.form.value);
        } */
  }
}

