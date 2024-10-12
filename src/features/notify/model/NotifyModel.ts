/* eslint-disable lines-between-class-members */
export class NotifyModel {
  callBack: () => void;
  container: HTMLDivElement;
  touchstartX: number;
  touchendX: number;
  transformX: number;
  touchstartXUY: number;

  constructor(callBack: () => void, container: HTMLDivElement) {
    this.callBack = callBack;
    this.container = container;
    this.touchstartX = 0;
    this.touchendX = 0;
    this.transformX = 0;
    this.touchstartXUY = 0;
  }

  private _handleGesure = () => {
    if (this.touchendX > this.touchstartX && this.touchendX - this.touchstartX > 120) {
      this.callBack();
      return true;
    }
    return false;
  };

  private _touchStart = (event: TouchEvent) => {
    this.container.style.transition = '0s';
    this.touchstartX = event.changedTouches[0].clientX;
    this.touchstartXUY = event.changedTouches[0].clientX;
  };

  private _touchEnd = (event: TouchEvent) => {
    this.container.style.transition = '0.35s ease-out';
    this.touchendX = event.changedTouches[0].clientX;
    const isWillClosed = this._handleGesure();
    if (!isWillClosed) this.container.style.transform = 'translateX(0px)';
  };

  private _touchMove = (event: TouchEvent) => {
    this.transformX = event.changedTouches[0].clientX;
    const differency = this.transformX - this.touchstartXUY;
    if (Math.abs(differency) > 10 && differency > -50) this.container.style.transform = `translateX(${differency}px)`;
  };

  init = () => {
    this.container.addEventListener('touchstart', this._touchStart, true);

    this.container.addEventListener('touchend', this._touchEnd, false);

    this.container.addEventListener('touchmove', this._touchMove, false);
  };

  deleteListeners = () => {
    this.container.removeEventListener('touchstart', this._touchStart);

    this.container.removeEventListener('touchend', this._touchEnd);

    this.container.removeEventListener('touchmove', this._touchMove);
  };
}
