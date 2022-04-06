import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

captcha: string;
email: string;
http!: HttpClient;

constructor() {
  this.captcha = "";
  this.email = "Secret@email.com";
}



  form!: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup ({
      name: new FormControl ('', [Validators.required,Validators.maxLength(10)]),
      email: new FormControl ('',[Validators.email, Validators.required]),
      number: new FormControl (null,[Validators.required, Validators.pattern('')]),
      message: new FormControl('',[Validators.required]),
      recaptcha: new FormControl(Validators.required)
     }) 
   }



resolved(captchaResponce: string) {
this.captcha = captchaResponce;
console.log('resolv' + this.captcha)
}


    
 submit() {
  let formData = {...this.form.value}
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:9000/api/message/create`);
  
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  let data = `{
    "name":"${formData.name}",
    "text":"${formData.message}",
    "phone":"${formData.number}",
    "email":"${formData.email}"
}`
    console.log(xhr.send(data))
    console.log('Forms', this.form)
    

    console.log('Form Data:', formData)

    //this.form.reset()
  }
}




