import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, PlanDetailOutput, UCPoint, Cocomo, FPoint } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'summary-report',
    templateUrl: 'summary-report.component.html',
    styleUrls: ['summary-report.component.scss'],
    animations: [appModuleAnimation()]
})
export class SummaryReportComponent extends AppComponentBase implements OnInit {
    constructor(
        injector : Injector,
        private _planService : PlanServiceProxy,
        private activatedRoute: ActivatedRoute
    ){
        super(injector)
    }

    planId :string
    plan: PlanDetailOutput

    showedUCP:UCPoint
    showedCCM:any
    showedFP: FPoint
    ngOnInit(){
        this.plan = new PlanDetailOutput
        this.showedUCP = new UCPoint()
        this.showedCCM = new Cocomo()
        this.showedFP = new FPoint()
        this.activatedRoute.params.subscribe((params: Params)=>{
            this.planId = params["estimationId"]
            this._planService.getPlanDetail(this.planId).subscribe((result)=>{
                this.plan = result
                

                this.showedCCM = result.ccm.slice(-1)[0]
                this.showedUCP = result.ucp.slice(-1)[0]
                this.showedFP = result.fp.slice(-1)[0]
                if (this.showedFP){
                this.showedFP.caf = Number(this.showedFP.caf.toFixed(1))
                this.showedFP.fp = Number(this.showedFP.fp.toFixed(1))
                }
                if (this.showedCCM){
                this.showedCCM.effort=Number(this.showedCCM.effort.toFixed(1))
                this.showedCCM.time=Number(this.showedCCM.time.toFixed(1))
                
                }
                if (this.showedUCP){
                this.showedUCP.ucp=Number(this.showedUCP.ucp.toFixed(1))
                this.showedUCP.ef=Number(this.showedUCP.ef.toFixed(1))
                this.showedUCP.tf=Number(this.showedUCP.tf.toFixed(1))
                }
                // debugger
            })
            
        })
        
    }
    textMessage:any
    msgHideAndShow:boolean =false
    // Text Message   
    textMessageFunc(msgText){  
    this.textMessage=msgText+" Copied to Clipboard";  
    this.msgHideAndShow=true;  
    setTimeout(() => {  
        this.textMessage="";  
        this.msgHideAndShow=false;  
    }, 1000);  
    } 
    CopyClipboard(summary){
        summary.select()
        document.execCommand('copy')
        summary.setSelectionRange(0,0)
        this.textMessageFunc('Date');  
        this.notify.info(this.l('Copied!'));
    }
}
