import { Component, OnInit, Injector, SkipSelf } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanServiceProxy, FpInput, FpOutput } from '@shared/service-proxies/service-proxies';
import { MatDialog } from '@angular/material';
import { NgForm, ControlContainer } from '@angular/forms';
import { SaveNewEstimationComponent } from '@app/estimation/save-new-estimation/save-new-estimation.component';
import { SaveOldEstimationComponent } from '@app/estimation/save-old-estimation/save-old-estimation.component';

@Component({
    moduleId: module.id,
    selector: 'fp',
    templateUrl: 'fp.component.html',
    styleUrls: ['fp.component.scss'],
    animations: [appModuleAnimation()],
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class FpComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        private activatedroute: ActivatedRoute,
        private _planService: PlanServiceProxy,
        private _router: Router,
        public dialog: MatDialog,
    ) {
        super(injector);
    }
    state: boolean
    Input: FpInput

    status: boolean = false

    InitUFP: number[] = []
    InitCAF: number[] = []

    planId: string
    ngOnInit() {
        this.Input = new FpInput()

        if (this.activatedroute.snapshot.queryParams['id']) {
            //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
            this.activatedroute.queryParams.subscribe((data: any) => {
                this.planId = data.id
                // this.PlanInput.title = data.title
                // this.PlanInput.description = data.description
                if (data.id == null) {
                    //reload and ask abandon? 
                    location.reload()
                    //this.normalstate()
                }
                else {

                    //have id param on url
                    this.Input.planID = data.id
                    if (data.status == "true") {
                        this.status = true
                        //TRUE ! edit
                        this._planService.getOutputFp(data.id).subscribe((result: FpOutput) => {
                            this.InitUFP = result.ufp
                            this.InitCAF = result.caf

                            console.log(this.InitUFP)
                        })
                    } else {
                        //not show, just save                   
                    }
                    this.state = true
                    //console.log(data)
                }


            })
        }
        else {
            this.normalstate()
        }

    }

    normalstate() {
        this.state = false
        //console.log('none')
    }
    onSubmit(form: NgForm): void {
        return;
    }

    UFPs: number = 0
    CAFs: number = 0

    FP: number = 0

    FormValue: any
    onClick(form: NgForm): void {
        //const json = JSON.stringify(form.value);
        //console.log(form.value)
        //console.log(json);
        // Object.keys(form.value).forEach(element => {
        //     if (element=="UUCP"){

        //     } else 
        //     if (element==)

        // });
        //cal uucp
        this.FormValue = form.value
        var ufp = form.value.UFP
        this.UFPs = ((7 * ufp.NLFS + 10 * ufp.NLFA + 15 * ufp.NLFC) + (5 * ufp.NIFS + 7 * ufp.NIFA + 10 * ufp.NIFC) + (3 * ufp.NIS + 4 * ufp.NIA + 6 * ufp.NIC) + (4 * ufp.NOS + 5 * ufp.NOA + 7 * ufp.NOC) + (3 * ufp.NIQS + 4 * ufp.NIQA + 6 * ufp.NIQC))
        //cal CAF
        var caf = form.value.CAF
        Object.values(caf).forEach((factor: any) => {
            this.CAFs += (factor.weight * factor.rv)
        })
        this.CAFs = (0.65 + (0.01 * this.CAFs))

        this.FP = this.UFPs * this.CAFs


        //debugger
    }

    Update() {
        var utmp = []
        var c = []


        Object.values(this.FormValue.UFP).forEach((result: any) => {
            utmp.push(Number(result))
        })
        Object.values(this.FormValue.CAF).forEach((result: any) => {
            c.push(result.rv)
        })
        var u = []
        var k = 0
        for (let i = 0; i < 5; i++) {
            u.push([])
            for (let j = 0; j < 3; j++) {
                u[i].push(utmp[k])
                k++
            }
        }
        console.log(u, c)
        this.Input.ufp = u
        this.Input.caf = c


        this.Input.ufpR = this.UFPs
        this.Input.cafR = this.CAFs

        this.Input.fpR = this.FP
        const dialogRef = this.dialog.open(SaveOldEstimationComponent, {
            width: '750px',
            data: { type: 'FP', point: this.FP }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.Input.effort = result.effort
            this.Input.time = result.time
            this.Input.staff = result.staff
            this._planService.setFp(this.Input).subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this._router.navigate(['/app/estimation']) //not sure    
            })
        })
    }

    SaveNew() {
        //MISSINGGGGGGGGGGG
        var utmp = []
        var c = []


        Object.values(this.FormValue.UFP).forEach((result: any) => {
            utmp.push(Number(result))
        })
        Object.values(this.FormValue.CAF).forEach((result: any) => {
            c.push(result.rv)
        })
        var u = []
        var k = 0
        for (let i = 0; i < 5; i++) {
            u.push([])
            for (let j = 0; j < 3; j++) {
                u[i].push(utmp[k])
                k++
            }
        }
        console.log(u, c)
        this.Input.ufp = u
        this.Input.caf = c

        this.Input.ufpR = this.UFPs
        this.Input.cafR = this.CAFs

        this.Input.fpR = this.FP
        const dialogRef = this.dialog.open(SaveNewEstimationComponent, {
            width: '550px',
            data: { type: 'FP', point: this.FP }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.Input.planID = result.planId

            this.Input.effort = result.effort
            this.Input.time = result.time
            this.Input.staff = result.staff
            console.log(this.Input)
            this._planService.setFp(this.Input).subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this._router.navigate(['/app/estimation']) //not sure    
            })

        });
    }
}
