import { Directive } from '@angular/core';

@Directive({
  selector: '[appInvalidtype]'
})
export class InvalidtypeDirective implements OnInit{
  @Input('invalidtype') type: string;
  private hasView = false;
  constructor(
    private invalidmessage: InvalidmessageDirective,
    private templateRef: templateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
  ngOnit(){
    this.invalidmessage.controlValue$.subscribe(() => {
      this.setVisible();
    });
  }

  private setVisible() {
    if(this.invalidmessage.match(this.type)){
      if(!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    }else{
      if(this.hasView){
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }

}
