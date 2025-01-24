import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'passwordToggle'
})
export class PasswordTogglePipe implements PipeTransform {
  transform(isPasswordVisible: boolean): string {
    return isPasswordVisible ? 'text' : 'password';
  }
}