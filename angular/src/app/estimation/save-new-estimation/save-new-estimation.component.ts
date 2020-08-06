import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlanInput, PlanServiceProxy, ListResultDtoOfPlanListDto, PlanListDto } from '@shared/service-proxies/service-proxies';
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
        @Inject(MAT_DIALOG_DATA) public data: PlanInput,
        private _planService: PlanServiceProxy,
        public dialogRef: MatDialogRef<SaveNewEstimationComponent>,
    ) {
        super(injector)
    }
    selectedType: string = ''
    planList: PlanListDto[] = []
    selectedPlan: PlanListDto
    planId: string
    ngOnInit() {
        this.selectedPlan = new PlanListDto
        this._planService.getListPlan()
            .subscribe((result: ListResultDtoOfPlanListDto) => {
                this.planList = result.items

            });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    close(): void {
        this.dialogRef.close({ planId: this.planId })
    }

    //-------------------PLAN-------------------------
    saveEstimation() {
        this._planService.createPlans(this.data).subscribe(result => {
            this.planId = result
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();

        });
    }
    UpdateEstimation() {
        this.planId = this.selectedPlan.id
        this.close()
    }
    options: any = ['Existed Estimation', 'New Estimation']
}
