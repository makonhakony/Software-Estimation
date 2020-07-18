import { Component, OnInit, SkipSelf, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProjectServiceProxy, ProjectSlocDetail } from '@shared/service-proxies/service-proxies';
import { CocomoService } from './cocomo.service';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
        private activatedroute: ActivatedRoute
    ) {

    }
    selectedProject: ProjectSlocDetail
    selectedMode: SelectedValue
    selectedModel: SelectedValue
    projects: ProjectSlocDetail[] = []
    state: boolean = false

    options2 = [
        { value: 'Basic COCOMO Model', description: 'Basic COCOMO can be used for quick and slightly rough calculations of Software Costs. Its accuracy is somewhat restricted due to the absence of sufficient factor considerations.', type: 0 },
        { value: 'Intermediate COCOMO Model', description: 'Intermediate COCOMO can be used for more accurated calculations of Software Costs. It takes these Cost Drivers into account.', type: 1 },
        { value: 'Detailed COCOMO model', description: 'Detailed COCOMO additionally accounts for the influence of individual project phases, i.e in case of Detailed it accounts for both these cost drivers and also calculations are performed phase wise henceforth producing a more accurate result. ', type: 2 }
    ]

    options = [
        { value: 'Organic Mode', description: 'Relatively small, simple software projects in which small teams with good application experience work to a set of less than rigid requirements.', type: 0 },
        { value: 'Semi-detached Mode', description: 'An intermediate, (in size and complexity), software project in which teams with mixed experience levels must meet a mix of rigid and less than rigid requirements.', type: 1 },
        { value: ' Embedded Mode', description: ' A software project that must be developed within a set of tight hardware, software and operation constraints.', type: 2 }]
   
    ngOnInit() {
        this.selectedMode = {} as SelectedValue
        this.selectedModel = {} as SelectedValue
        this.selectedProject = new ProjectSlocDetail()
        this._projectService.getListSlocDetail().subscribe((result) => {
            this.projects = result.items
            console.log(this.projects)
            if (this.activatedroute.snapshot.queryParams['id']) {
                //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
                this.activatedroute.queryParams.subscribe((data: any) => {
                    this.projects.forEach((project)=>{
                        if (project.id == data.id){
                            this.selectedProject = project
                            this.state =true
                        }
                    })
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

    EffortResult: string = 'Waiting...'
    TimeResult: string = 'Waiting...'
    StaffResult: string = 'Waiting...'

    CalculateBasic() {

        this.internalService.BasicCocomo(this.selectedMode.type, this.selectedProject.sloc).subscribe((result) => {
            this.EffortResult = result.effort
            this.TimeResult = result.time
            this.StaffResult = result.staff
            console.log(result)
        })
    }


    selectedOption: any[] = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

    option: any[] = [
        { value: 0, name: 'Very Low' },
        { value: 1, name: 'Low' },
        { value: 2, name: 'Normal' },
        { value: 3, name: 'High' },
        { value: 4, name: 'Very High' },
    ]

    Attribute: any[] = [
        { name: 'Required Reliability', option: this.option },
        { name: 'Database Size', option: this.option },
        { name: 'Product Complexity', option: this.option },
        { name: 'Execution Time Constraint', option: this.option },
        { name: 'Main Storage Constraint', option: this.option },
        { name: 'Platform Volatility', option: this.option },
        { name: 'Computer Turnaround Time', option: this.option },
        { name: 'Analyst Capability', option: this.option },
        { name: 'Applications Experience', option: this.option },
        { name: 'Programmer Capability', option: this.option },
        { name: 'Platform Experience', option: this.option },
        { name: 'Programming Language and Tool Experience', option: this.option },
        { name: 'Moden Programming Practices', option: this.option },
        { name: 'Use of Software Tool', option: this.option },
        { name: 'Require Development Schedule', option: this.option },
    ]
    CalculateInter() {

        this.internalService.InterCocomo(this.selectedMode.type, this.selectedOption, this.selectedProject.sloc).subscribe((result) => {
            this.EffortResult = result.effort
            this.TimeResult = result.time
            this.StaffResult = result.staff
            console.log(result)
        })
    }
}
