import { Component, SkipSelf, Input, OnInit, SimpleChanges, AfterViewInit, ChangeDetectorRef, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { HelperModalComponent } from '@app/estimation/helper-modal/helper-modal.component';
import { MatDialog } from '@angular/material';
export interface RV {
    value: number
    name: string
    checked: boolean
}
@Component({
    moduleId: module.id,
    selector: 'environmental-complexity',
    templateUrl: 'environmental-complexity.component.html',
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class EnvironmentalComplexityComponent implements OnInit {
    constructor(
        private cdr: ChangeDetectorRef,
        private dialog : MatDialog
    ) { 
        
    }
    selectedOption2: any[] = []
    selectedValue: number

    @Input() InitValue: number[]
    @Input() status: boolean
    isDisabled: boolean
    initialize: boolean = false
    ngOnInit() {
        
        //this.cdr.detectChanges()
        for (let i = 0; i < 8; i++) {
            let rate: RV[] = [
                { value: 0, name: "irrelevant", checked: false },
                { value: 1, name: "barely relevant", checked: false },
                { value: 2, name: "might be needed", checked: false },
                { value: 3, name: "required", checked: false },
                { value: 4, name: "important", checked: false },
                { value: 5, name: "very important", checked: false },
            ]
            this.listRV.push(rate)
            this.selectedOption2.push(0)
        }

        this.Factors.forEach((value, index) => {
            this.Factors[index].rv = this.listRV[index]
            if (!this.status) {

                this.Factors[index].rv[0].checked = true
            }
        })
        this.initialize = true
       

    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (this.initialize) {
            //debugger
            if (changes['InitValue'].currentValue) {
                if (this.InitValue.length != 0) {
                    //this.cdr.reattach()
                    console.log(this.status, this.InitValue)
                    this.selectedOption2 = this.InitValue
                    // this.cdr.detectChanges()
                }
            }
            
        }
        
    }
    value: any
    listRV: any[8] = []

    Factors = [
        { name: 'Familiar with the project model that is used', weight: 1.5, rv: undefined },
        { name: 'Application experience', weight: 0.5, rv: undefined },
        { name: 'Object-oriented experience', weight: 1.0, rv: undefined },
        { name: 'Lead analyst capability', weight: 0.5, rv: undefined },
        { name: 'Motivation', weight: 1.0, rv: undefined },
        { name: 'Stable requirements', weight: 2.0, rv: undefined },
        { name: 'Part-time staff', weight: -1.0, rv: undefined },
        { name: 'Difficult programing language', weight: -1.0, rv: undefined },
    ]
    onCheck(i: any, j: any) {
        // console.log('test:', i, ',', j)
        // this.Factors[i].rv.forEach((x: any) => {
        //     x.checked = false
        // })
        // this.Factors[i].rv[j].checked = true
        // const checkedOptions = this.Factors[i].rv.filter(x => x.checked);
        // this.selectedValue = checkedOptions.map(x => x.value);
        // //this.selectedWeight= checkedOptions.map(x=>x.weight)
        // this.selectedOption[i] = this.selectedValue[0]
        // console.log("select: ", this.selectedOption[i])

    }
    OpenHelper(){
        const dialogRef = this.dialog.open(HelperModalComponent, {
          width: '550px',
          data: { title: 'EF', description: 'ECF is the Environment Complexity Factor for a project. This estimates factors will not be implemented in a project, but severely impact it. ECF deals with the project team and their ability to complete the project. Each factor needs to be rated on a scale of 0 (irrelevant) to 5 (essential).' }
      });
      
      dialogRef.afterClosed().subscribe(async result => {
          
          console.log('after close:', result)
    
    
      })
    }
}
