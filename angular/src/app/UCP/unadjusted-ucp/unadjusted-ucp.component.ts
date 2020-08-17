import { Component, SkipSelf, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { HelperModalComponent } from '@app/estimation/helper-modal/helper-modal.component';

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
  constructor(
    public dialog: MatDialog,
  ) {

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
  helperInfo: any[] = [
    {title: 'UUCW', description: 'UUCW is the Unadjusted Use Case Weight for a project. Determining the impact that each Use Case will have on a system is critical to the project size. The number of transactions a Use Case handles will need to be found for each Use Case. There are three classifications that a Use Case can be: Simple, Average or Complex.'},
    {title: 'UAW', description: 'UAW is the Unadjusted Actor Weight for a program. Actors contribute to the size of the project, therefore all Actors must be well thought out for the entire system. There are three classifications which an Actor can be: Simple, Average and Complex.'}

  ]
  OpenHelper(i:number){
    const dialogRef = this.dialog.open(HelperModalComponent, {
      width: '550px',
      data: { title: this.helperInfo[i].title, description: this.helperInfo[i].description }
  });
  
  dialogRef.afterClosed().subscribe(async result => {
      
      console.log('after close:', result)


  })
  }
}
