import { Component } from '@angular/core';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_shared/api/user.service';
import { Urls } from 'src/app/_shared/constants/Urls';
import { User } from 'src/app/_shared/models/Users';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm?: FormGroup;
  showPass: boolean = false;
  showPass1: boolean = false;
  urls = Urls;
  registerPhase = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toasterService: ToastrService
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required, Validators.maxLength(50), Validators.pattern(/^[^0-9_”„"!¡?÷?¿\/\\+=@#$%ˆ^&*(){}|~<>;:[\]]*$/)]],
      lastName: [null, [Validators.required, Validators.maxLength(50), Validators.pattern(/^[^0-9_”„"!¡?÷?¿\/\\+=@#$%ˆ^&*(){}|~<>;:[\]]*$/)]],
      passwords: this.fb.group(
        {
          password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()_\-=\[\]{}+.,><?:;'"/|])[a-zA-Z`~!@#$%^&*()_\-\[\]{}=+.,><?:;'"/|\d]{8,}$/)]],
          repeatPassword: [null, [Validators.required]],
        },
        { validator: this.passwordMatchValidator }
      )
    });
  }

  onSubmit(): void {
    if (this.registerForm?.invalid) {
      return;
    }

    let md5 = new Md5();
    let hashedPassword = md5.appendStr(this.password.value).end()?.toString()
    let user: User = {
      email: this.email.value,
      password: hashedPassword!,
      firstName: this.firstName.value,
      lastName: this.lastName.value
    }

    this.userService.getUserByEmail(user.email).subscribe({
      next: (response: User[]) => {
        if(response[0]){
          this.toasterService.error('There is already a user with this email.');
        }
        else{
          this.userService.register(user).subscribe({
            next: (response: any) => {
              this.registerPhase = false;
            }
          });
        }
      }
    });


  }

  goTo(url: Urls): void {
    this.router.navigate([`${Urls.AUTH}/${url}`]);
  }

  get firstName() {
    return this.registerForm!.get('firstName')!;
  }

  get lastName() {
    return this.registerForm!.get('lastName')!;
  }

  get email() {
    return this.registerForm?.get('email')!;
  }

  get passwords() {
    return this.registerForm?.get('passwords')!;
  }

  get password() {
    return this.registerForm?.get('passwords')!.get('password')!;
  }

  get repeatPassword() {
    return this.registerForm?.get('passwords')!.get('repeatPassword')!;
  }

  passwordMatchValidator(control: AbstractControl){
    return control.get('password')?.value !== control.get('repeatPassword')?.value ? { confPass: true } : null;
  }
}
