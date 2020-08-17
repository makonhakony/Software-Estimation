import { Component, Input, SimpleChanges, SkipSelf, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { HelperModalComponent } from '@app/estimation/helper-modal/helper-modal.component';
import { MatDialog } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'unadjusted-fp',
    templateUrl: 'unadjusted-fp.component.html',
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class UnadjustedFpComponent  {
    constructor(
        private dialog :MatDialog
    ){}
    @Input() InitValue: number[][] =[[]]
    @Input() status: boolean
    NLFS : number
    NLFA : number
    NLFC : number

    NIFS : number
    NIFA : number
    NIFC : number

    NIS : number
    NIA : number
    NIC : number

    NOS : number
    NOA : number
    NOC : number

    NIQS : number
    NIQA : number
    NIQC : number
    
    ngOnChanges(changes: SimpleChanges) {
      if (changes['InitValue'].currentValue) {
        console.log(this.status, this.InitValue)
  
        this.NLFS = this.InitValue[0][0]
        this.NLFA = this.InitValue[0][1]
        this.NLFC = this.InitValue[0][2]

        this.NIFS = this.InitValue[1][0]
        this.NIFA = this.InitValue[1][1]
        this.NIFC = this.InitValue[1][2]

        this.NIS = this.InitValue[2][0]
        this.NIA = this.InitValue[2][1]
        this.NIC = this.InitValue[2][2]

        this.NOS = this.InitValue[3][0]
        this.NOA = this.InitValue[3][1]
        this.NOC = this.InitValue[3][2]

        this.NIQS = this.InitValue[4][0]
        this.NIQA = this.InitValue[4][1]
        this.NIQC = this.InitValue[4][2]
  
  
      }
    }
    helperInfo: any[]=[
        {title:'Internal Logical Files', description:'Internal Logical File (ILF) is a user identifiable group of logically related data or control information that resides entirely within the application boundary. The primary intent of an ILF is to hold data maintained through one or more elementary processes of the application being counted. An ILF has the inherent meaning that it is internally maintained, it has some logical structure and it is stored in a file.'},
        {title:'External Interface Files', description:'External Interface File (EIF) is a user identifiable group of logically related data or control information that is used by the application for reference purposes only. The data resides entirely outside the application boundary and is maintained in an ILF by another application. An EIF has the inherent meaning that it is externally maintained, an interface has to be developed to get the data from the file.'},
        {title:'External Inputs', description: 'External Input (EI) is a transaction function in which Data goes “into” the application from outside the boundary to inside. This data is coming external to the application.'},
        {title: 'External Outputs', description: 'External Output (EO) is a transaction function in which data comes “out” of the system. Additionally, an EO may update an ILF. The data creates reports or output files sent to other applications.'},
        {title: 'External Inquiries', description:'External Inquiry (EQ) is a transaction function with both input and output components that result in data retrieval. '}
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
