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
        new MenuItem(this.l('My Storage'), '', 'folder', '', [
            new MenuItem(this.l('Cloned Project Storage'), '', 'cloud_done', '/app/project'),
            new MenuItem(this.l('Estimating Result Storage'), '', 'library_add_check', '/app/estimation'),
        ]),
        new MenuItem(this.l('Personal Historical Data'), '', 'restore', '/app/histoest'),
        new MenuItem(this.l('Estimated by Use Case Point'), '', 'accessibility_new', '/app/ucp'),
        new MenuItem(this.l('Estimated by Function Point'), '', 'functions', '/app/fp'),
        new MenuItem(this.l('Estimation using COCOMO'), '', 'code', '/app/cocomo'),

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
