import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_shared/api/user.service';
import { Urls } from 'src/app/_shared/constants/Urls';
import { User } from 'src/app/_shared/models/Users';
import { LoggedUserService } from 'src/app/_shared/services/logged-user.service';
import { StorageHelperService } from 'src/app/_shared/services/storage-helper.service';
import { Md5 } from 'ts-md5/dist/esm/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPass = false;
  urls = Urls;
  title?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageHelper: StorageHelperService,
    private userService: UserService,
    private loggedUser: LoggedUserService,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false, []]
    });

    let email = this.storageHelper.getRememberMe();
    if(email){
      this.rememberMe.setValue(true);
      this.email.setValue(email);
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    if(this.rememberMe.value){
      this.storageHelper.setRememberMe(this.email.value);
    }

    let md5 = new Md5();
    let password = md5.appendStr(this.password.value).end()?.toString();
    this.userService.getUserByEmailAndPassword(this.email.value, password!).subscribe({
      next: (response: User[]) => {
        if(response[0]){
          this.loggedUser.setUser(response[0]);
          this.toasterService.success('Logged in successfully.');
          this.router.navigate([Urls.APP]);
        }
        else{
          this.toasterService.error('Email or password are incorrect.');
        }
      }
    });
  }

  goTo(url: Urls): void {
    this.router.navigate([`${Urls.AUTH}/${url}`]);
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  get rememberMe(): AbstractControl {
    return this.loginForm.get('rememberMe')!;
  }
}
