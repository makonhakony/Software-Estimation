import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlanInput, PlanServiceProxy, ListResultDtoOfPlanListDto, PlanListDto, HistoEstimationServiceProxy, HistoAverage } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'save-new-estimation',
    templateUrl: 'save-new-estimation.component.html',
    styleUrls: ['save-new-estimation.component.scss']
})
export class SaveNewEstimationComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _planService: PlanServiceProxy,
        public dialogRef: MatDialogRef<SaveNewEstimationComponent>,
        private _histoService :HistoEstimationServiceProxy
    ) {
        super(injector)
    }
    selectedType: string = ''
    planList: PlanListDto[] = []
    selectedPlan: PlanListDto
    planId: string
    plan : PlanInput
    hist :HistoAverage
    effort: number =0 
    time: number =0 
    staff: number =0
    point: number =0 
    ngOnInit() {
        this.hist = new HistoAverage()
        this.plan = new PlanInput()
        this.selectedPlan = new PlanListDto
        this._planService.getListPlan()
            .subscribe((result: ListResultDtoOfPlanListDto) => {
                this.planList = result.items

            });
        this._histoService.getAveragePf(this.data.type).subscribe(result => {
            this.hist = result
            this.point = this.data.point
            this.effort = this.point * this.hist.pf
            this.time = 3*this.effort**(1/3)
            this.staff = this.effort/this.time
        })
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    // close(): void {
    //     this.dialogRef.close({ planId: this.planId })
    // }

    //-------------------PLAN-------------------------
    saveEstimation(cond: boolean) {
        this._planService.createPlans(this.plan).subscribe(result => {
            this.planId = result
            this.notify.info(this.l('SavedSuccessfully'));
            if(!cond){
                this.effort = 0
                this.time = 0
                this.staff = 0
            }
            this.dialogRef.close({ planId: this.planId, effort: this.effort, time: this.time, staff: this.staff })

        });
    }
    UpdateEstimation(cond: boolean) {
        this.planId = this.selectedPlan.id
        if(!cond){
            this.effort = 0
            this.time = 0
            this.staff = 0
        }
        this.dialogRef.close({ planId: this.planId, effort: this.effort, time: this.time, staff: this.staff })
    }
    options: any = ['Existed Estimation', 'New Estimation']
}
