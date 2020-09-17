import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { HistoAverage, HistoEstimationServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    moduleId: module.id,
    selector: 'save-old-estimation',
    templateUrl: 'save-old-estimation.component.html',
    styleUrls: ['save-old-estimation.component.scss']
})
export class SaveOldEstimationComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<SaveOldEstimationComponent>,
        private _histoService :HistoEstimationServiceProxy
    ) {
        super(injector)
    }
    
    hist: HistoAverage
    effort: number =0 
    time: number =0 
    staff: number =0
    point: number =0 
    ngOnInit() {
        this.hist = new HistoAverage()
        
        this._histoService.getAveragePf(this.data.type).subscribe(result => {
            this.hist = result
            
            this.point = this.data.point
            this.effort = this.point * this.hist.pf
            this.time = 3*this.effort**(1/3)
            this.staff = Math.round(this.effort/this.time)
            //debugger
        })
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    // close(): void {
    //     this.dialogRef.close({ planId: this.planId })
    // }

    //-------------------PLAN-------------------------
    
    UpdateEstimation(cond: boolean) {
        
        if(!cond){
            this.effort = 0
            this.time = 0
            this.staff = 0
        }
        this.dialogRef.close({ effort: this.effort, time: this.time, staff: this.staff })
    }
}
