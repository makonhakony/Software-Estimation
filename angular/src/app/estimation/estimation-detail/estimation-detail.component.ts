import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { PlanServiceProxy, PlanDetailOutput, UCPoint, Cocomo, FPoint } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Params } from '@angular/router';
import { param } from 'jquery';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'estimation-detail',
    templateUrl: 'estimation-detail.component.html',
    styleUrls: ['estimation-detail.component.scss'],
    animations: [appModuleAnimation()]
})
export class EstimationDetailComponent extends AppComponentBase implements OnInit {
    constructor(
        injector : Injector,
        private _planService : PlanServiceProxy,
        private activatedRoute: ActivatedRoute
    ){
        super(injector)
    }
    planId :string
    plan: PlanDetailOutput
    mode:string = ''
    model : string =''
    ngOnInit(){
        
        this.showedUCP = new UCPoint()
        this.showedCCM = new Cocomo()
        this.showedFP = new FPoint()
        this.activatedRoute.params.subscribe((params: Params)=>{
            this.planId = params["estimationId"]
            this._planService.getPlanDetail(this.planId).subscribe((result)=>{
                this.plan = result
                

                this.showedCCM = result.ccm.pop()
                this.showedUCP = result.ucp.pop()
                this.showedFP = result.fp.pop()
                if (this.showedFP){
                this.showedFP.caf = Number(this.showedFP.caf.toFixed(1))
                this.showedFP.fp = Number(this.showedFP.fp.toFixed(1))
                this.showedFP.effort = Number(this.showedFP.effort.toFixed(1))
                }
                if (this.showedCCM){
                this.showedCCM.effort=Number(this.showedCCM.effort.toFixed(1))
                if (this.showedCCM.mode == 0){
                    this.mode='Organic'
                } else if (this.showedCCM.mode == 1){
                    this.mode = 'Semi-detached'
                } else if ( this.showedCCM.mode ==2 ){
                    this.mode = 'Embedded'
                }

                if (this.showedCCM.model == 0){
                    this.model = 'Basic'
                } else if (this.showedCCM.model == 1){
                    this.model = "Intermediate"
                }

                }
                if (this.showedUCP){
                this.showedUCP.ucp=Number(this.showedUCP.ucp.toFixed(1))
                this.showedUCP.ef=Number(this.showedUCP.ef.toFixed(1))
                this.showedUCP.tf=Number(this.showedUCP.tf.toFixed(1))
                this.showedFP.effort = Number(this.showedFP.effort.toFixed(1))
                }
                
            })
        })
    }

    showedUCP:UCPoint
    showedCCM:Cocomo
    showedFP: FPoint
    

}
