import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Component({
    moduleId: module.id,
    selector: 'ucp',
    templateUrl: 'ucp.component.html',
    styleUrls: ['ucp.component.scss']
})
export class UcpComponent {
    onSubmit(form: NgForm): void {
        return;
    }

    UUCPs:number=0
    TFs:number = 0
    EFs:number =0
    UCP:number=0
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
}
