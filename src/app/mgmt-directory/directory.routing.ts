import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteComponent } from "../../components"
import { SourceComponent } from './source/source.component';

export const MgmtDirectoryRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
	    component: SiteComponent,
        children: [
			{
	            path: 'source',
	            component: SourceComponent
	        },
			
			
        ]
    }
]);