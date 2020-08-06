import { Component, OnInit } from '@angular/core';
import { PlanServiceProxy, ListResultDtoOfPlanListDto, PlanListDto, PlanInput } from '@shared/service-proxies/service-proxies';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MatDialog } from '@angular/material';
import { CreateEstimationComponent } from './create-estimation/create-estimation.component';
import { AddEstimatingValueComponent } from './add-estimating-value/add-estimating-value.component';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'estimation',
    templateUrl: 'estimation.component.html',
    styleUrls: ['estimation.component.scss'],
    animations: [appModuleAnimation()]
})
export class EstimationComponent implements OnInit {
    constructor(
        private _planService: PlanServiceProxy,
        public dialog: MatDialog,
        private route : Router
    ) {

    }
    ngOnInit() {
        this.loadPlan()
        
    }
    planList: PlanListDto[] = [];
    panelOpenState1: boolean[] = [];
    panelOpenState2: boolean[] = [];
    loadPlan() {


        this._planService.getListPlan()
            .subscribe((result: ListResultDtoOfPlanListDto) => {
                this.planList = result.items;
                this.planList.forEach(() => {
                    this.panelOpenState1.push(false)
                    this.panelOpenState2.push(false)
                })
                console.log(this.planList)
            });
    }
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this.loadPlan();
        finishedCallback();
    }

    estimation: PlanInput
    createProject() {
        this.estimation = new PlanInput()

        const dialogRef = this.dialog.open(CreateEstimationComponent, {
            width: '550px',
            data: { title: this.estimation.title, description: this.estimation.description }
        });

        dialogRef.afterClosed().subscribe(async result => {

            console.log('after close:', result)


        })
    }

    //Estimating model
    OpenModel(plan:PlanListDto){
        const dialogRef = this.dialog.open(AddEstimatingValueComponent,{
            
            data:{id :plan.id}
        });

        dialogRef.afterClosed().subscribe(async result => {

            console.log('after close:', result)
        })
    }
    GotoDetail(id:string){
        this.route.navigate(['app/estimation',id])
    }
    DeletePlan(id:string){
        this._planService.delete(id).subscribe(()=>{
            this.loadPlan()
        })
    }
}