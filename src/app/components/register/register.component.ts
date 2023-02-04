import { Router } from '@angular/router';
import { UserRestService } from './../services/user.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../services/LanguageService';
import { TranslateService } from '@ngx-translate/core';

export interface Role {
  id: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  roleList!: Role[];
  currentFlag!: string;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private userRestService: UserRestService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentFlag = this.languageService.currentFlag;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rptpassword: ['', [this.validPassword()]],
      role: ['', [Validators.required]],
    });
    this.userRestService.getUser().subscribe((result) => {
      this.roleList = result as Role[];
    });
  }

  private validPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      const controls = this.form ? this.form.controls : null;
      if (controls) {
        if (
          this.form.controls['password']?.value !=
            this.form.controls['rptPassword']?.value &&
          this.form.controls['password']?.dirty &&
          this.form.controls['rptPassword']?.dirty
        ) {
          setTimeout(() => {
            controls['rptPassword'].markAsTouched();
            controls['rptPassword'].markAsDirty();
            controls['rptPassword'].setErrors({ diffrentPassword: true });
          });
        }
      }
      return Validators.required(control);
    };
  }
  register() {
    const values = this.form.getRawValue();
    delete values.rptpassword;

    this.userRestService.registrationUser(values).subscribe(
      (response) => {
        console.log(response);
        if (response === 'Added') {
          this.router.navigate(['../login']);
        }
      },
      () => {
        this.dialog.open(DialogComponent, {
          data: {
            header: this.translate.instant('translation.Error_Login'),
            message: this.translate.instant('translation.Error_Login_Message'),
            class: 'error-style',
          },
        });
      }
    );
  }
  changeLanguage(language: string): void {
    this.languageService.ChangeLanguage(language);
    this.currentFlag = this.languageService.currentFlag;
  }
}
