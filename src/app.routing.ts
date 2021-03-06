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
    { path: 'mgmt-authority', loadChildren: 'app/mgmt-authority/authority.module#AuthorityModule' },
    { path: 'mgmt-content', loadChildren: 'app/mgmt-content/content.module#ContentModule' },
    { path: 'mgmt-directory', loadChildren: 'app/mgmt-directory/directory.module#MgmtDirectoryModule' },
    { path: 'mgmt-assessment', loadChildren: 'app/mgmt-assessment/assessment.module#AssessmentModule' },
    { path: 'other-page', loadChildren: 'app/other-page/other-page.module#OtherPageModule' },
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    // { path: 'cloud-host-service', loadChildren: 'module/cloud-host-service/cloud-host-service.module#CloudHostService' },
    // { path: 'mng-console', loadChildren: 'module/mng-console/mng-console.module#MngConsoleModule' },
    // { path: 'user-center', loadChildren: 'module/user-center/user-center.module#UserCenterModule' },
    // { path: 'op-center', loadChildren: 'module/op-center/order-mng/order-mng.module#OrderMngModule' },
    // { path: 'image-mng', loadChildren: 'module/image-mng/image-mng.module#ImgMngModule' },
    // { path: 'ali-cloud-service', loadChildren: 'module/ali-cloud-service/ali-cloud.module#AliCloudModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);