import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService :AuthService){

  }
  


  register(data:any){
    console.log(data)
    if(data.password !== data.confirm_password){
    return   alert('please confirm your password')
    }

    this.authService.register(data).subscribe({
      next:(data)=>{
        alert("user registration successfull")
      }
    })


  }
}
