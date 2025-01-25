import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Users } from 'src/app/core/models/users.model';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { UsersService } from 'src/app/core/services/impl/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  formGroup: FormGroup;
  user?: Users | null;

  constructor(
    private fb: FormBuilder,
    private userSvc: UsersService,
    private authSvc:BaseAuthenticationService,
    private mediaSvc:BaseMediaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private translateSvc: TranslateService
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      picture: ['']
    });
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      const user = await this.authSvc.getCurrentUser();
      if(user){
          this.user = await lastValueFrom(this.userSvc.getByUserId(user.id));
          console.log(this.user);
          if (this.user) {
            const updatedPerson: any = {
              ...this.user,
              email:user.email,
              userId:user.id,
              picture: typeof this.user.picture === 'object' ? 
                            this.user.picture.url : 
                            undefined
            };
            this.formGroup.patchValue(updatedPerson);
          }
      }
    } catch (error) {
      console.error(error);
      const toast = await this.toastCtrl.create({
        message: await lastValueFrom(this.translateSvc.get('COMMON.ERROR.LOAD')),
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }

  async onSubmit() {
    if (this.formGroup.valid && this.user) {
      const loading = await this.loadingCtrl.create();
      await loading.present();

      try {
        const changedValues = {} as Record<keyof Users, any>;
        Object.keys(this.formGroup.controls).forEach(key => {
          if (this.formGroup.get(key)?.dirty) {
            changedValues[key as keyof Users] = this.formGroup.get(key)?.value;
          }
        });

        if(changedValues.picture){
          // Convertir base64 a Blob
          const base64Response = await fetch(changedValues.picture);
          const blob = await base64Response.blob();
          const uploadedBlob = await lastValueFrom(this.mediaSvc.upload(blob));
          changedValues.picture = uploadedBlob[0];
        } 
        
        await lastValueFrom(this.userSvc.update(this.user.id, changedValues));
        
        const toast = await this.toastCtrl.create({
          message: await this.translateSvc.get('COMMON.SUCCESS.SAVE').toPromise(),
          duration: 3000,
          position: 'bottom'
        });
        await toast.present();
      } catch (error) {
        console.error(error);
        const toast = await this.toastCtrl.create({
          message: await this.translateSvc.get('COMMON.ERROR.SAVE').toPromise(),
          duration: 3000,
          position: 'bottom'
        });
        await toast.present();
      } finally {
        await loading.dismiss();
      }
    }
  }

  get name(){
    return this.formGroup.controls['name'];
  }

  get surname(){
    return this.formGroup.controls['surname'];
  }

  get email(){
    return this.formGroup.controls['email'];
  }

}