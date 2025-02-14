import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LanguageService } from 'src/app/core/services/language.service';

interface Language {
  code: string;
  name: string;
  shortCode: string;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LanguageSelectorComponent),
    multi: true
  }
]
})
export class LanguageSelectorComponent implements ControlValueAccessor {
languages: Language[] = [
  { code: 'es', name: 'COMMON.SPANISH', shortCode: 'ES' },
  { code: 'en', name: 'COMMON.ENGLISH', shortCode: 'GB' },
  { code: 'fr', name: 'COMMON.FRENCH', shortCode: 'FR'},
  { code: 'it', name: 'COMMON.ITALIAN', shortCode: 'IT'},
  { code: 'de', name: 'German', shortCode: 'DE'},
  { code: 'zh', name: 'Chinese', shortCode: 'CN' },
  { code: 'ru', name: 'Russian', shortCode: 'RU'},
  { code: 'sa', name: 'Arab', shortCode: 'SA'},
  { code: 'pt', name: 'Portuguese', shortCode: 'PT'}
];

isOpen = false;
selectedLanguage: string;
disabled = false;

constructor(
  private languageService: LanguageService
) {
  this.selectedLanguage = this.languageService.getCurrentLang();
}

onChange: any = () => {};
onTouch: any = () => {};

toggleDropdown(): void {
  if (!this.disabled) {
    this.isOpen = !this.isOpen;
  }
}

selectLanguage(code: string): void {
  this.selectedLanguage = code;
  this.languageService.changeLanguage(code);
  this.languageService.storeLanguage(code);
  this.isOpen = false;
  this.onChange(code);
  this.onTouch();
}

getCurrentLanguage() {
  return this.languages.find(lang => lang.code === this.selectedLanguage);
}

writeValue(value: string): void {
  if (value) {
    this.selectedLanguage = value;
  }
}

registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouch = fn;
}

setDisabledState(isDisabled: boolean): void {
  this.disabled = isDisabled;
}
}