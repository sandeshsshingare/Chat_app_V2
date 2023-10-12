import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private authService:AuthService){}

  login(data:any){
    this.authService.login(data).subscribe({
      next:(data)=>{
        alert('login successfull');
      }
    })
  }
}
