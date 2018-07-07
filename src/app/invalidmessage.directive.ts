/*import { Directive } from '@angular/core';

@Directive({
  selector: '[appInvalidmessage]'
})
export class InvalidmessageDirective implements OnInit, OnDestroy{
  @Input() invalidmessage: string;
  control: AbstrctControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;
  constructor(
    private_fg: ControlContainer,
    private_el: ElementRef,
    private render: Renderer2
  ) { }

  ngOnInit() {
    this.control = this.form.get(this.invalidmessage);
    let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.map(() =>{
      this.hasSubmitted = true;
    });
  }

  private setVisible() {
    if(this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
      this.render.removeStyle(this._el.nativeElement, 'display');
    }else {
      this.render.setStyle(this._el.nativeElement, 'display', 'none');
    }
    match(error:string){
      if(this.control && this.control.errors){
        if(Object.keys(this.control.errors).indexOf(error) > -1){
          return true;
        }
      }
      return false;
    }

    get form() { return this._fg_formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

    ngOnDestroy(){
      this.controlSubscription.unsubscribe();
    }
  }
}
*/
