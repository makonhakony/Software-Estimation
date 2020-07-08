import { Component, SkipSelf, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
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

    selectedOption: any[] = []
    selectedValue: number

    @Input("InitValue") InitValueEF: number[]
    @Input() status: boolean
    isDisabled:boolean
    ngOnInit() {
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
            this.selectedOption.push(0)
        }

        this.Factors.forEach((value, index) => {
            this.Factors[index].rv = this.listRV[index]
            if (!this.status) {
                this.Factors[index].rv[0].checked = true
            }
        })

        //console.log(this.Factors)

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['InitValueEF'].currentValue) {
            if (this.InitValueEF.length != 0) {
                console.log(this.status, this.InitValueEF)
                this.Factors.forEach((a, index) => {
                    //console.log(a.rv)
                    a.rv[this.InitValueEF[index]].checked = true
                })
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
        const prevCheckedOptions = this.Factors[i].rv.filter(x => x.checked);
        const prevChecdedValue = prevCheckedOptions.map(x => x.value)
        if (prevChecdedValue != j) {
            //this.isDisabled =false
            console.log(prevChecdedValue)
            this.Factors[i].rv.forEach((x: any) => {
                x.checked = false
            })
            this.Factors[i].rv[j].checked = true
            const checkedOptions = this.Factors[i].rv.filter(x => x.checked);
            this.selectedValue = checkedOptions.map(x => x.value);
            //this.selectedWeight= checkedOptions.map(x=>x.weight)
            this.selectedOption[i] = this.selectedValue[0]
            console.log("select: ", this.selectedOption[i])
        }
        else{
            //this.isDisabled =true
            this.selectedOption[i] = prevChecdedValue
            console.log(this.Factors[i].rv)
        }
    }
}
