import { Component, OnInit, Input, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanServiceProxy, UcpInput, PlanUpdate, PlanInput, UcpOutput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'ucp',
    templateUrl: 'ucp.component.html',
    styleUrls: ['ucp.component.scss']
})
export class UcpComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        private activatedroute: ActivatedRoute,
        private _planService :PlanServiceProxy,
        private _router : Router,
    ){
        super(injector);
    }
    state:boolean
    Input :UcpInput
    PlanInput :PlanUpdate
    status: boolean =false

    InitUUCP: number[] =[]
    InitTF: number[] =[]
    InitEF: number[] =[]
    ngOnInit(){
        this.Input = new UcpInput()
        this.PlanInput = new PlanUpdate()
        if (this.activatedroute.snapshot.queryParams['id']) {
            //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
            this.activatedroute.queryParams.subscribe((data:any)=>{
                this.PlanInput.id = data.id
                this.PlanInput.title = data.title
                this.PlanInput.description = data.description
                if (data.id==null){
                    //reload and ask abandon? 
                    location.reload()
                    //this.normalstate()
                }
                else{
                    
                    //have id param on url
                    this.Input.planID= data.id
                    if (data.status=="true"){
                          this.status =true                 
                        //TRUE ! edit
                        this._planService.getOutputUcp(data.id).subscribe((result:UcpOutput)=>{
                            this.InitUUCP = result.uucp
                            this.InitTF = result.tf
                            this.InitEF = result.ef
                            console.log(result)
                        })
                    }else{                                                
                        //not show, just save                   
                    }
                    this.state = true
                    console.log(data)
                }
                
                
            })
       }
       else{
           this.normalstate()
       }
        
    }

    normalstate(){
        this.state = false
        console.log('none')
    }
    onSubmit(form: NgForm): void {
        return;
    }

    UUCPs:number=0
    TFs:number = 0
    EFs:number =0
    UCP:number=0

    FormValue: any
    onClick(form: NgForm): void {
        //const json = JSON.stringify(form.value);
        console.log(form.value)
        //console.log(json);
        // Object.keys(form.value).forEach(element => {
        //     if (element=="UUCP"){
                
        //     } else 
        //     if (element==)

        // });
        //cal uucp
        this.FormValue = form.value
        var uucp=form.value.UUCP
        this.UUCPs=((5*uucp.NSUC+10*uucp.NAUC+15*uucp.NCUC)+(1*uucp.NSA+2*uucp.NAA+3*uucp.NCA))
        //cal TF
        var tf =form.value.TF
        Object.values(tf).forEach((factor:any)=>{
            this.TFs+=(factor.weight*factor.rv)
        })
        this.TFs=(0.6+(0.01*this.TFs))
        //cal TF
        var ef =form.value.EF
        Object.values(ef).forEach((factor:any)=>{
            this.EFs+=(factor.weight*factor.rv)
        })
        this.EFs=1.4+(-0.03*this.TFs)
        this.UCP=this.UUCPs*this.TFs*this.EFs
        
        
        //debugger
    }
    
    Update(){
        var u =[]
        var t =[]
        var e =[]

        Object.values(this.FormValue.UUCP).forEach((result:any)=>{
            u.push(Number(result))
        })
        Object.values(this.FormValue.TF).forEach((result:any)=>{
            t.push(result.rv)
        })
        Object.values(this.FormValue.EF).forEach((result:any)=>{
            e.push(result.rv)
        })

        console.log(u,t,e)
        this.Input.uucp = u
        this.Input.tf = t
        this.Input.ef = e
        //plan
        this.PlanInput.uucp = this.UUCPs
        this.PlanInput.ef = this.EFs
        this.PlanInput.tf = this.TFs
        this.PlanInput.ucp = this.UCP
        this._planService.setUcp(this.Input).subscribe(()=>{
            
            this._planService.updatePlanResult(this.PlanInput).subscribe(()=>{
                this.notify.info(this.l('SavedSuccessfully'));
                this._router.navigate(['/app/project']) //not sure
            })
            
        })
    }

    SaveNew(){

    }
}
