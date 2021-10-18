/**
 * Class to manage keyboard controls.
 *
 * Key listeners update various properties that can be used by other apps.
 */
export default class ControlsHandler {

  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.space = false;
    this.enter = false;

    this.xAxis = 0;
    this.yAxis = 0;

    this.initListeners();
  }

  /**
   * Initialize the keyboard listeners.
   */
  initListeners() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;

      switch (keyName) {
        case 'ArrowUp':
          if (!this.up) {
            this.up = true;
            this.yAxis = 1;
          }
          break;
        case 'ArrowDown':
          if (!this.down) {
            this.down = true;
            this.yAxis = -1;
          }
          break;
        case 'ArrowLeft':
          if (!this.left) {
            this.left = true;
            this.xAxis = -1;
          }
          break;
        case 'ArrowRight':
          if (!this.right) {
            this.right = true;
            this.xAxis = 1;
          }
          break;
        case ' ':
          if (!this.space) {
            this.space = true;
          }
          break;
        case 'Enter':
          if (!this.enter) {
            this.enter = true;
          }
          break;
      }
    }, false);

    document.addEventListener('keyup', (event) => {
      const keyName = event.key;

      switch (keyName) {
        case 'ArrowUp':
          this.up = false;
          this.yAxis = this.down ? -1 : 0;
          break;
        case 'ArrowDown':
          this.down = false;
          this.yAxis = this.up ? 1 : 0;
          break;
        case 'ArrowLeft':
          this.left = false;
          this.xAxis = this.right ? 1 : 0;
          break;
        case 'ArrowRight':
          this.right = false;
          this.xAxis = this.left ? -1 : 0;
          break;
        case ' ':
          this.space = false;
          break;
        case 'Enter':
          this.enter = false;
          break;
      }
    }, false);
  }

}
