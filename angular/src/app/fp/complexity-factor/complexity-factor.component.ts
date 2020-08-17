import { Component, OnInit, ChangeDetectorRef, Input, SimpleChanges, SkipSelf } from '@angular/core';
import { FormBuilder, ControlContainer } from '@angular/forms';
import { HelperModalComponent } from '@app/estimation/helper-modal/helper-modal.component';
import { MatDialog } from '@angular/material';
export interface RV {
    value: number
    name: string
    
}
@Component({
    moduleId: module.id,
    selector: 'complexity-factor',
    templateUrl: 'complexity-factor.component.html',
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class ComplexityFactorComponent implements OnInit {
    constructor(
        private cdr: ChangeDetectorRef,
        private fb :FormBuilder,
        private dialog: MatDialog
    ) { 
        //this.cdr.detach()
    }
    myform:any
    selectedValues: number;
    selectedOption: any[] = []

    @Input() InitValue: number[]
    @Input() status: boolean

    initialize: boolean = false
    ngOnInit() {
        
        
        for (let i = 0; i < 14; i++) {
            let rate: RV[] = [
                { value: 0, name: "irrelevant"},
                { value: 1, name: "barely relevant" },
                { value: 2, name: "might be needed" },
                { value: 3, name: "required" },
                { value: 4, name: "important"},
                { value: 5, name: "very important"},
            ]
            this.listRV.push(rate)
            
            this.selectedOption.push(0)
        }
        this.Factors.forEach((value, index) => {

            this.Factors[index].rv = this.listRV[index]
            
        })
        
        //debugger
        console.log(this.selectedOption)
        this.initialize = true
        
    }

    
    ngOnChanges(changes: SimpleChanges) {
        if (this.initialize){
            if (changes['InitValue'].currentValue) {
                if (this.InitValue.length != 0) {
                    
                    console.log(this.status, this.InitValue)
                    this.selectedOption = this.InitValue
                    
                }
                
                
            }
            
        }
        //this.cdr.reattach()
        
        
    }
    value: any
    listRV: any[14] = []

    Factors = [
        { name: 'Backup and recovery', weight: 1.0, rv: undefined },
        { name: 'Data communications', weight: 1.0, rv: undefined },
        { name: 'Distributed processing', weight: 1.0, rv: undefined },
        { name: 'Performance critical', weight: 1.0, rv: undefined },
        { name: 'Existing operating environment', weight: 1.0, rv: undefined },
        { name: 'On-line data entry', weight: 1.0, rv: undefined },
        { name: 'Input transaction over multiple screens', weight: 1.0, rv: undefined },
        { name: 'Master files updated online', weight: 1.0, rv: undefined },
        { name: 'Information domain values complex', weight: 1.0, rv: undefined },
        { name: 'Internal processing complex', weight: 1.0, rv: undefined },
        { name: 'Code designed for reuse', weight: 1.0, rv: undefined },
        { name: 'Conversion/installation in design', weight: 1.0, rv: undefined },
        { name: 'Multiple installations', weight: 1.0, rv: undefined },
        { name: 'Application designed for change', weight: 1.0, rv: undefined }
    ]
    OpenHelper(){
        const dialogRef = this.dialog.open(HelperModalComponent, {
          width: '550px',
          data: { title: 'Calculate Adjusted Function Point', description: 'To calculate the Complexity adjustment value, several factors have to be considered, such as Backup and recovery, code design for reuse, etc. Total complexity adjustment value is counted based on responses to questions called complexity weighting factors in the table below.  Each complexity weighting factor is assigned a value (complexity adjustment value) that ranges between 0 (not important) to 5 (absolutely essential). ' }
      });
      
      dialogRef.afterClosed().subscribe(async result => {
          
          console.log('after close:', result)
    
    
      })
    }
}

