import { Component, Input, SkipSelf, ViewChild, OnInit, Output, SimpleChanges, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
export interface RV {
    value: number
    name: string
    
}

@Component({
    moduleId: module.id,
    selector: 'technical-complexity',
    templateUrl: 'technical-complexity.component.html',
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})


export class TechnicalComplexityComponent implements OnInit {
    constructor(
        private cdr: ChangeDetectorRef,
        private fb :FormBuilder
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
        
        
        for (let i = 0; i < 13; i++) {
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
    listRV: any[13] = []

    Factors = [
        { name: 'Distributed System', weight: 2.0, rv: undefined },
        { name: 'Response time or throughput performance objectives', weight: 1.0, rv: undefined },
        { name: 'End user efficiency', weight: 1.0, rv: undefined },
        { name: 'Complex internal processing', weight: 1.0, rv: undefined },
        { name: 'Code must be reusable', weight: 1.0, rv: undefined },
        { name: 'Easy to install', weight: 0.5, rv: undefined },
        { name: 'Easy to use', weight: 0.5, rv: undefined },
        { name: 'Portable', weight: 2.0, rv: undefined },
        { name: 'Easy to change', weight: 1.0, rv: undefined },
        { name: 'Concurrent', weight: 1.0, rv: undefined },
        { name: 'Includes special security objectives', weight: 1.0, rv: undefined },
        { name: 'Provides direct access for third parties', weight: 1.0, rv: undefined },
        { name: 'Special user training facilities are required', weight: 1.0, rv: undefined }
    ]
    // selectedValue:number
    // onCheck(i:any,j:any) {
    //     // console.log('test:', i, ',', j)
        
        
    //     // //this.selectedWeight= checkedOptions.map(x=>x.weight)
    //     // this.selectedOption[i] = j
    //     console.log("select: ", this.selectedOption)

    // }

    
}
