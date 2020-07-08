import { Component, SkipSelf, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'unadjusted-ucp',
  templateUrl: 'unadjusted-ucp.component.html',

  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class UnadjustedUcpComponent {
  constructor() {

  }
  @Input() InitValue: number[]
  @Input() status: boolean
  NSUC: number
  NAUC: number
  NCUC: number
  NSA: number
  NAA: number
  NCA: number

  // ngOnInit(){
  //   console.log(this.status,this.InitValue)
  //   if (this.status){
  //     this.NSUC = this.InitValue[0]
  //     this.NAUC = this.InitValue[1]
  //     this.NCUC = this.InitValue[2]
  //     this.NSA = this.InitValue[3]
  //     this.NAA = this.InitValue[4]
  //     this.NCA = this.InitValue[5]

  //   }
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['InitValue'].currentValue) {
      console.log(this.status, this.InitValue)

      this.NSUC = this.InitValue[0]
      this.NAUC = this.InitValue[1]
      this.NCUC = this.InitValue[2]
      this.NSA = this.InitValue[3]
      this.NAA = this.InitValue[4]
      this.NCA = this.InitValue[5]


    }
  }
}
