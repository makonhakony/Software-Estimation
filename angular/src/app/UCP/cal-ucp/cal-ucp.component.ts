import { Component, Input } from '@angular/core';
import { PlanServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    moduleId: module.id,
    selector: 'cal-ucp',
    templateUrl: 'cal-ucp.component.html',
    
})
export class CalUcpComponent {
    @Input() UUCP:number
    @Input() UCP:number
    @Input() TF:number
    @Input()EF :number
    
    

    

}
