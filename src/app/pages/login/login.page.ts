import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  currentLang:string
  loginForm: FormGroup;
  img: string|undefined = './../../../assets/img/campo-futbol2.jpg';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private authSvc:BaseAuthenticationService,
    private languageService: LanguageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.currentLang = this.languageService.getStoredLanguage();
  }

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
    this.languageService.storeLanguage(lang);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authSvc.signIn(this.loginForm.value).subscribe({
        next: resp=>{
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl); // Redirige a la página solicitada
        },
        error: err=>{
          console.log(err);
        }
      });
      
    } else {
      console.log('Formulario no válido');
    }
  }

  onRegister(){
    this.loginForm.reset();
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.router.navigate(['/register'], {queryParams:{ returnUrl:returnUrl}, replaceUrl:true});
  }

  onForgotPassword(){

  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }
}