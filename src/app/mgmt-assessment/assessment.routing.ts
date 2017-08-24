import {
  ModuleWithProviders
} from '@angular/core';
import {
  RouterModule
} from '@angular/router';

import {
  SiteComponent
} from "../../components"
import {
  ContinueEducationeComponent
} from './continue-educatione/continue-educatione.component'
import {
  PersonalDescriptionComponent
} from './personal-description/personal-description.component'
import { DeEducationeComponent } from './de-educatione/de-educatione.component'
import { CanReviewComponent } from './can-review/can-review.component'
import { DemocraticTestComponent } from './democratic-test/democratic-test.component'
import { OrdinaryTimesComponent } from './ordinary-times/ordinary-times.component'
import { ForProjectComponent } from './for-project/for-project.component'
import { SendingManuscriptComponent } from './sending-manuscript/sending-manuscript.component'

export const AssessmentRouting: ModuleWithProviders = RouterModule.forChild([{
  path: '',
  component: SiteComponent,
  children: [{
      path: 'continue-educatione',
      component: ContinueEducationeComponent
    },
    {
      path: 'personal-description',
      component: PersonalDescriptionComponent
    },{
      path: 'de-educatione',
      component: DeEducationeComponent
    },
    {
      path: 'can-review',
      component: CanReviewComponent
    },{
      path: 'democratic-test',
      component: DemocraticTestComponent
    },{
      path: 'ordinary-times',
      component: OrdinaryTimesComponent
    },{
      path: 'for-project',
      component: ForProjectComponent
    },{
      path: 'sending-manuscript',
      component: SendingManuscriptComponent
    }
  ]
}]);
