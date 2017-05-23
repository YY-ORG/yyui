import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { SiteComponent } from './components/site/site.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'authority', loadChildren: 'app/authority/authority.module#AuthorityModule' },
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    // { path: 'cloud-host-service', loadChildren: 'module/cloud-host-service/cloud-host-service.module#CloudHostService' },
    // { path: 'mng-console', loadChildren: 'module/mng-console/mng-console.module#MngConsoleModule' },
    // { path: 'user-center', loadChildren: 'module/user-center/user-center.module#UserCenterModule' },
    // { path: 'op-center', loadChildren: 'module/op-center/order-mng/order-mng.module#OrderMngModule' },
    // { path: 'image-mng', loadChildren: 'module/image-mng/image-mng.module#ImgMngModule' },
    // { path: 'ali-cloud-service', loadChildren: 'module/ali-cloud-service/ali-cloud.module#AliCloudModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);