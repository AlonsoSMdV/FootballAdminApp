import { AnimationOptions } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  options: AnimationOptions = {
    //path: '/assets/lotties/lottie.json',
  }
  
  constructor(
    private router:Router,
    private authSvc:BaseAuthenticationService
  ) { }

  ngOnInit() {
    timer(2500).subscribe(_=>{
      this.router.navigate(['/home']);
    });
  }
}
