import { Component, OnInit, SkipSelf, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProjectServiceProxy, ProjectSlocDetail, PlanServiceProxy, SepInput } from '@shared/service-proxies/service-proxies';
import { CocomoService } from './cocomo.service';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SaveNewEstimationComponent } from '@app/estimation/save-new-estimation/save-new-estimation.component';
import { HelperModalComponent } from '@app/estimation/helper-modal/helper-modal.component';

export interface SelectedValue {
    value: string
    description: string
    type: number
}
@Component({
    moduleId: module.id,
    selector: 'cocomo',
    templateUrl: 'cocomo.component.html',
    styleUrls: ['cocomo.component.scss'],
    animations: [appModuleAnimation()],
    // viewProviders: [{
    //     provide: ControlContainer,
    //     useFactory: (container: ControlContainer) => container,
    //     deps: [[new SkipSelf(), ControlContainer]],
    // }]
})
export class CocomoComponent implements OnInit {

    constructor(

        private _projectService: ProjectServiceProxy,
        private internalService: CocomoService,
        private activatedroute: ActivatedRoute,
        private _planService: PlanServiceProxy,
        private route: Router,
        private dialog: MatDialog
    ) {

    }
    selectedProject: ProjectSlocDetail
    selectedMode: SelectedValue
    selectedModel: SelectedValue
    projects: ProjectSlocDetail[] = []
    state: boolean = false
    disableProject: boolean = false
    options2 = [
        { value: 'Basic COCOMO Model', description: 'Basic COCOMO can be used for quick and slightly rough calculations of Software Costs. Its accuracy is somewhat restricted due to the absence of sufficient factor considerations.', type: 0 },
        { value: 'Intermediate COCOMO Model', description: 'Intermediate COCOMO can be used for more accurated calculations of Software Costs. It takes these Cost Drivers into account.', type: 1 },
        { value: 'Detailed COCOMO model', description: 'Detailed COCOMO additionally accounts for the influence of individual project phases, i.e in case of Detailed it accounts for both these cost drivers and also calculations are performed phase wise henceforth producing a more accurate result. ', type: 2 }
    ]

    options = [
        { value: 'Organic Mode', description: 'Relatively small, simple software projects in which small teams with good application experience work to a set of less than rigid requirements.', type: 0 },
        { value: 'Semi-detached Mode', description: 'An intermediate, (in size and complexity), software project in which teams with mixed experience levels must meet a mix of rigid and less than rigid requirements.', type: 1 },
        { value: ' Embedded Mode', description: ' A software project that must be developed within a set of tight hardware, software and operation constraints.', type: 2 }]
    existed: boolean = false
    planID: string
    ngOnInit() {
        this.selectedMode = {} as SelectedValue
        this.selectedModel = {} as SelectedValue
        this.selectedProject = new ProjectSlocDetail()
        this._projectService.getListSlocDetail().subscribe((result) => {
            this.projects = result.items
            console.log(this.projects)
            if (this.activatedroute.snapshot.queryParams['id']) {
                this.existed = true
                //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
                this.activatedroute.queryParams.subscribe((data: any) => {
                    this.planID = data.id
                    if (data.type == 'archived') {
                        this.projects.forEach((project) => {
                            if (project.id == data.idP) {
                                this.selectedProject = project
                                this.state = true
                            }
                        })
                    } else if (data.type == 'custom') {
                        this.selectedProject.title = 'Custom Sloc Value'
                        this.selectedProject.sloc = data.sloc
                        this.disableProject = true
                        this.state = true
                    }
                })

            }
        })
    }

    ChangeModel() {
        console.log(this.selectedProject)
        this.state = true
    }

    state2: boolean = false
    ChangeModel2() {
        console.log(this.selectedMode)
        this.state2 = true
    }

    state3: boolean = false
    ChangeModel3() {

        console.log(this.selectedModel)
        this.state3 = true
    }
    SEP: SepInput
    EffortResult: number = 0
    TimeResult: number = 0
    StaffResult: number = 0




    selectedOption: any[] = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

    option: any[] = [
        { value: 0, name: 'Very Low' },
        { value: 1, name: 'Low' },
        { value: 2, name: 'Normal' },
        { value: 3, name: 'High' },
        { value: 4, name: 'Very High' },
    ]

    Attribute: any[] = [
        { name: 'Required Reliability', option: this.option, description:'This reflects the extent that a software product can be expectedto perform its intended funtions satisfactorily. \n+Verylow: The effect of a software failureis simply the inconvenience incumbent on the developers to fix the fault. \n+Low: The effect of a software failure is a low leve, easiy recoverable loss to users. \n +Normal: the effect of a software failure is a moderate loss to users, but a situatuation for hich one can recover without extreme penalty. \n +High: the effect of a software failure can be a mojor financial loss or a massive human incovenience.' },
        { name: 'Database Size', option: this.option, description:'This is the relative database size to be developed whre size refers to the amount of data to be assembled and stored in non-main storage: D/P = (Dtbase size in bytes or characters) / (Program size in SLOC) \n Very low: not determine \n +Low: D/P <10 \n Normal: 10<=D/P<=100 \n +High: 100<=D/P<=1000 \n +Very high: D/P >1000' },
        { name: 'Product Complexity', option: this.option, description:'Complexity is assessed as the subjective average of tour types of control functions: cintrol, computation, device-dependent or data management operations. \n +very Low: straight-line code with a few none-nested structured programming opertions: DOs, CASEs, IF-THEN-ELSEs. Simpe predicates. \n +Low: Straight forward nesting of strucured programing operators. Mosetly simple predicates. \n+Noral: Mostly simple nesting. Some intermodule control. Decision table. \n+High: Highly nested structured programming operators with many compound predicates. Queue and stack control. Considerable intermodule control. \n +Very high: Reentrant and recursive coding. Fixed-priority interupt handing.' },
        { name: 'Execution Time Constraint', option: this.option, descrition:'This reflects the degree of execution time constraint imposed upon a software product. the rating is expressed in term of available execution time expected to be used. \n+Very low: No rating \n+Low: No rating.\nNormal: <=50% use of available execution time \n+High: 70% use of available execution time. \n+Very high: 85% use of available execution time.' },
        { name: 'Main Storage Constraint', option: this.option, description:'This refects the percentage of main storage expected to be used by the software product and any subsystems consuming the main storage resources. ain storage refers to direct random access storage such as disks, tapes, or optical drives.\n+Very low: No rating.\n+Low: No rating. \n+Normal: <=50% use of available storage.\n+High: 70% use of available storage.\n+Very high: 85% use of available storage.' },
        { name: 'Platform Volatility', option: this.option, description:'This reflects the level of volatility of the virtual machine underlying the software product to be developed. The virtual machine is defined as the complex of hardware and software. The product will call upon to accomplish its tasks. \n+Very low: No rating. \n +Low: Major change every 12 months. \n +Normal: Mojor change every 6 months. \n+High: Major change every 2 months. \n+ Very high: No rating' },
        { name: 'Computer Turnaround Time', option: this.option, description: 'This reflects the level of computer response time experienced by the project team deveping the software product. The response time is the average time from then the developers hands. \n+Very low: No rating. \n+Low: Interactive. \nNormal: average turnaround time < 4 hours. \+High: 4-12 Hours.\n+Very high: >12 hours.' },
        { name: 'Analyst Capability', option: this.option , description: 'Analysts participate in the development and validation of requirements and preliminar design specifications. They consults on detailed design and code activities. They are heavily involved in intergration and test. \n Very low:'},
        { name: 'Applications Experience', option: this.option, description: '' },
        { name: 'Programmer Capability', option: this.option, description: '' },
        { name: 'Platform Experience', option: this.option, description: '' },
        { name: 'Programming Language and Tool Experience', option: this.option, description: '' },
        { name: 'Moden Programming Practices', option: this.option, description: '' },
        { name: 'Use of Software Tool', option: this.option, description: '' },
        { name: 'Require Development Schedule', option: this.option, description: '' },
    ]

    disableWhenCal: boolean = false
    CalculateBasic() {
        this.disableWhenCal = true
        this.internalService.BasicCocomo(this.selectedMode.type, this.selectedProject.sloc).subscribe((result) => {
            this.EffortResult = result.effort.toFixed(1)
            this.TimeResult = result.time.toFixed(1)
            this.StaffResult = result.staff
            console.log(result)
        })
    }
    CalculateInter() {
        this.disableWhenCal = true
        this.internalService.InterCocomo(this.selectedMode.type, this.selectedOption, this.selectedProject.sloc).subscribe((result) => {
            this.EffortResult = result.effort.toFixed(1)
            this.TimeResult = result.time.toFixed(1)
            this.StaffResult = result.staff
            console.log(result)
        })
    }


    UpdateEstimation() {
        this.SEP = new SepInput()
        this.SEP.planID = this.planID
        this.SEP.effort = this.EffortResult
        this.SEP.time = this.TimeResult
        this.SEP.staff = this.StaffResult
        this.SEP.mode = this.selectedMode.type
        this.SEP.model = this.selectedModel.type
        this.SEP.sloc = this.selectedProject.sloc


        this._planService.setSep(this.SEP).subscribe(() => {
            this.route.navigate(['app/estimation'])
        })
    }

    SaveNew() {
        const dialogRef = this.dialog.open(SaveNewEstimationComponent, {
            width: '550px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.SEP = new SepInput()
            this.SEP.planID = result.planId
            this.SEP.effort = this.EffortResult
            this.SEP.time = this.TimeResult
            this.SEP.staff = this.StaffResult
            this.SEP.mode = this.selectedMode.type
            this.SEP.model = this.selectedModel.type
            this.SEP.sloc = this.selectedProject.sloc
            console.log(this.SEP)

            this._planService.setSep(this.SEP).subscribe(() => {
                this.route.navigate(['app/estimation'])
            })

        });
    }
    Refresh(){
        window.location.reload();
    }
    
    OpenHelper(i:number){
        const dialogRef = this.dialog.open(HelperModalComponent, {
          width: '550px',
          data: { title: this.Attribute[i].name, description: this.Attribute[i].description }
      });
      
      dialogRef.afterClosed().subscribe(async result => {
          
          console.log('after close:', result)
    
    
      })
      }
}
