import { Component, Inject, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlanInput, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'create-estimation',
    templateUrl: 'create-estimation.component.html',
    styleUrls: ['create-estimation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateEstimationComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) public data: PlanInput,
        private _planService :PlanServiceProxy,
        public dialogRef: MatDialogRef<CreateEstimationComponent>,
    ){
        super(injector)
    }
    ngOnInit() {
        
        
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    close(): void {
        this.dialogRef.close({data:this.data})
    }

    //-------------------PLAN-------------------------
    savePlan(){
                this._planService.createPlans(this.data).subscribe(async () => {
                    console.log("this data: ", this.data)
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close();
        
                });
            }
}
