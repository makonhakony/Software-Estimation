import { Component, Input } from '@angular/core';

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
