import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'cal-fp',
    templateUrl: 'cal-fp.component.html',
    
})
export class CalFpComponent {
    @Input() UFP:number
    @Input() FP:number
    @Input() CAF:number
    
}
