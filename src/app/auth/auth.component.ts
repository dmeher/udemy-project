import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  @ViewChild('authForm') authForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.isLogin) {
      this.authService.login(this.authForm.value.email, this.authForm.value.password);
    } else {
      this.authService.signUp(this.authForm.value.email, this.authForm.value.password);
    }
  }

}
