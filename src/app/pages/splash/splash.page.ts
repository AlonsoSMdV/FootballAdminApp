
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { timer } from 'rxjs';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:true,
  imports:[IonicModule, LottieComponent]
})
export class SplashPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/lotties/lottie.json',
  }

  onAnimationCreated(animationItem: AnimationItem): void {
    console.log('Animación creada:', animationItem);
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
