/**
 * @author Nurali K
 * @description Directive to disable input and turn off autocompletion
 */
import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[disableKeyPress]'
})
export class DisableKeyPressDirective {

  @HostBinding('autocomplete') public autocomplete;

  constructor() {
    this.autocomplete = 'off';
  }

  @HostListener('keypress', ['$event']) public disableKeys(event: Event) {
    event.preventDefault();
  }
}
