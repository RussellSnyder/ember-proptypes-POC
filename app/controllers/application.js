import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked
  buttonSize = 'small'

  @action
  toggleButtonSize() {
    this.buttonSize = this.buttonSize == 'small' ? 'large' : 'small'
  }
}
