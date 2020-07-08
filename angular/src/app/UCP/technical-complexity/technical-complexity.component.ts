import { Component, Input, SkipSelf, ViewChild, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
export interface RV{
    value : number
    name : string
    checked:boolean
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
    
    selectedValues: number;
    selectedOption:any[] = []
    @ViewChild('ref') ref
    @Input() InitValue :number[]
    @Input() status: boolean
    ngOnInit(){
        for(let i=0;i<13;i++){
            let rate:RV[]=[
                {value: 0, name:"irrelevant", checked: false},
                {value: 1, name:"barely relevant", checked:false},
                {value: 2, name:"might be needed", checked: false},
                {value: 3, name:"required", checked: false},
                {value: 4, name:"important", checked: false},
                {value: 5, name:"very important", checked: false},
            ]
            this.listRV.push(rate)
            this.selectedOption.push(0)
        }
        this.Factors.forEach((value,index)=>{
            
            this.Factors[index].rv = this.listRV[index]
            if (!this.status){
                this.Factors[index].rv[0].checked=true
                }
        })
        //debugger
        //console.log(this.Factors)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['InitValue'].currentValue) {

            if (this.InitValue.length !=0){
          console.log(this.status, this.InitValue)
            this.Factors.forEach((a,index)=>{
                //console.log(a.rv)
                a.rv[this.InitValue[index]].checked=true
            })
        }
        }
      }
    value:any
    listRV:any[13]=[]
    
    Factors=[
        {name:'Distributed System', weight:2.0, rv : undefined},
        {name:'Response time or throughput performance objectives',weight:1.0,rv:undefined},
        {name:'End user efficiency',weight:1.0,rv:undefined},
        {name:'Complex internal processing',weight:1.0,rv:undefined},
        {name:'Code must be reusable',weight:1.0,rv:undefined},
        {name:'Easy to install',weight:0.5,rv:undefined},
        {name:'Easy to use',weight:0.5,rv:undefined},
        {name:'Portable',weight:2.0,rv:undefined},
        {name:'Easy to change',weight:1.0,rv:undefined},
        {name:'Concurrent',weight:1.0,rv:undefined},
        {name:'Includes special security objectives',weight:1.0,rv:undefined},
        {name:'Provides direct access for third parties',weight:1.0,rv:undefined},
        {name:'Special user training facilities are required',weight:1.0,rv:undefined}
    ]
    onCheck(i:any,j:any){
        console.log('test:',i,',',j)
        this.Factors[i].rv.forEach((x:any)=>{
            x.checked = false
        })
        this.Factors[i].rv[j].checked=true  
        const checkedOptions = this.Factors[i].rv.filter(x => x.checked);
        this.selectedValues = checkedOptions.map(x => x.value);
        //this.selectedWeight= checkedOptions.map(x=>x.weight)
        this.selectedOption[i]= this.selectedValues[0]
        console.log("select: ",this.selectedOption[i])
        
    }

    
}
