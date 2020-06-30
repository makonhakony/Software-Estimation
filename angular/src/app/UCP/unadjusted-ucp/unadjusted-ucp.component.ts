import { Component, SkipSelf, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'unadjusted-ucp',
    templateUrl: 'unadjusted-ucp.component.html',
    
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
      }]
})
export class UnadjustedUcpComponent {
    
}
