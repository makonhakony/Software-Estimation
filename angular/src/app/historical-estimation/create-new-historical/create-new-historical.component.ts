import { Component, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'create-new-historical',
    templateUrl: 'create-new-historical.component.html',
    styleUrls: ['create-new-historical.component.scss']
})
export class CreateNewHistoricalComponent extends AppComponentBase {
    constructor(
        injector : Injector,
        public dialogRef : MatDialogRef<CreateNewHistoricalComponent>
    ){
        super(injector)
    }
    title:string
    description :string
    selectedType:string
    point:number
    time:number
    staff: number
    effort:number

    pf: number

    options:any[] = [
        {value:'UCP', name: 'Use Case Point'},
        {value:'FP', name: 'Function Point'}
    ]
    save(){
        this.effort = this.time * this.staff
        this.pf = this.effort/this.point 
        this.dialogRef.close({title:this.title,description:this.description, type: this.selectedType, effort: this.effort, time : this.time, staff: this.staff, point: this.point, pf: this.pf})
    }

    onNoClick(){
        this.dialogRef.close()
    }
}
