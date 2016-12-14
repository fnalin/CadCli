import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from './user.service';
import { ILogin } from './login.model';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  pageTitle: string = 'FSCadCli';
  subTitle: string = 'Identifique-se para prosseguir';
  loginVm: ILogin = { username: '', password: '' };
  loginForm: FormGroup;
  statusLoading: boolean = false;
  errorMessage: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])]
    });
  }

  ngAfterViewInit() {
    //$("input[name=parametro]").focus();
  }

  login(event) {
    event.preventDefault();
    this.statusLoading = true;
    this.userService.login(this.loginVm.username, this.loginVm.password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['']);
        }
        this.statusLoading = false;
      }
      , error => {
        this.errorMessage = <any>error;
        console.log(this.errorMessage);
        this.statusLoading = false;
      });
  }
}