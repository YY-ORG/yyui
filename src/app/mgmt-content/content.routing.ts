import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteComponent } from "../../components"
import { TablebodyComponent } from './tablebody/tablebody.component';
import { TableStructureComponent } from './table-structure/table-structure.component';

export const ContentRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
	    component: SiteComponent,
        children: [
			{
	            path: 'tablebody',
	            component: TablebodyComponent
	        },
			{
	            path: 'table-structure',
	            component: TableStructureComponent
	        },
			
        ]
    }
]);