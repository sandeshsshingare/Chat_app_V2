import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private authService:AuthService,private router: Router){}

  login(data:any){
    this.authService.login(data).subscribe({
      next:(data:any)=>{
        alert('login successfull');
        localStorage.setItem('chatUserToken', data.token)
        this.router.navigate(['/home/chats'])
      }
    })
  }
}
