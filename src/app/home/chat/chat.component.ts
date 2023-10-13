import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { io, Socket } from 'socket.io-client';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {
  usersList:any[] =[]
  messages:any[] = this.homeService.messageArray
  userDetails :any
  selectedUser:any
  @ViewChild('scroll') scroll !: ElementRef
  @ViewChild('msg') msg!: ElementRef

ngAfterViewInit(): void {
  console.log(this.scroll)
  setTimeout(() => {
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
  }, 1000);
}

  BASE_URL= "http://localhost:8080"
  private socket !:Socket;

    constructor(private homeService:HomeService, private router:Router){
    this.socket = io(this.BASE_URL)  
    
    
    this.socket.on('returning-add-message',(data)=>{
      console.log(data)
      this.messages.push(data)
      console.log(this.scroll)
      setTimeout(() => {
        
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
      }, 500);
    })

   
    this.getUserDetails()
     
    

    }

    getAllMessages(user:any){
      this.selectedUser = user
      this.homeService.getAllMessages(this.selectedUser._id).subscribe({
        next:(data:any)=>{
          console.log(data)
          this.messages = []
            this.messages = [...data.results[0].messages]
            setTimeout(() => {
              
              this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
            }, 500);
        }
      })
    }



    getUserDetails(){
      this.homeService.getSpecificUser().subscribe({next:(data:any)=>{
        this.userDetails = data.results
        console.log(this.userDetails)
        this.getListOfUsers();
      }})
    }
  
    getListOfUsers(){
      this.homeService.getListOfUsers().subscribe({next:(data:any)=>{
        let filteredData = data.results.filter((data:any)=> data._id !== this.userDetails._id)
        this.usersList = filteredData
      }})
    }

    sendMessage(msg:any){
      console.log(this.userDetails._id + " " + this.selectedUser._id )
      let obj = {
        message:msg.value,
        to:this.selectedUser._id,
        from: this.userDetails._id
      }
      this.homeService.sendMessage(obj)
      this.msg.nativeElement.value =''
    }

logout(){
  let confirm =window.confirm("Are you sure to logout")
   if(confirm){

     localStorage.removeItem('chatUserToken')
     this.router.navigate(["/auth/login"])
   }
  
}



}
