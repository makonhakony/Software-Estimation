import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('HomePage'), '', 'home', '/app/home'),

        new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
        new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem(this.l('About'), '', 'info', '/app/about'),
        //new MenuItem(this.l('My project'),'','important_devices','/app/project'),
        new MenuItem(this.l('Cloned Project Storage'), '', 'cloud_done', '/app/project'),
        new MenuItem(this.l('Estimation'), '', 'mediation', '', [
            new MenuItem(this.l('Estimating Result Storage'), '', 'folder', '/app/estimation'),
            new MenuItem(this.l('Use Case Point'), '', 'accessibility_new', '/app/ucp'),
            new MenuItem(this.l('Function Point'), '', 'functions', '/app/fp'),
            new MenuItem(this.l('Schedule and Effort'), '', 'av_timer', '/app/SnEpoint'),
        ]),
        new MenuItem(this.l('Cyclomatic Complexity Evaluation'), '', 'emoji_objects', '/app/CCEva'),
        

    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
