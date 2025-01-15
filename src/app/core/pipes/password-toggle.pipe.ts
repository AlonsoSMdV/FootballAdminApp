import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordToggle',
  standalone: true
})
export class PasswordTogglePipe implements PipeTransform {

  transform(isPasswordVisible: boolean): string {
    return isPasswordVisible ? 'text' : 'password';
  }

}
