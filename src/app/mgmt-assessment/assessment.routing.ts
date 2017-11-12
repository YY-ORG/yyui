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
import { ExaminationPaperComponent } from './examination-paper/examination-paper.component'
import { CanReviewComponent } from './can-review/can-review.component'
import { DemocraticTestComponent } from './democratic-test/democratic-test.component'
import { OrdinaryTimesComponent } from './ordinary-times/ordinary-times.component'
import { ForProjectComponent } from './for-project/for-project.component'
import { SendingManuscriptComponent } from './sending-manuscript/sending-manuscript.component'
import { ExaminationAssessComponent } from './examination-assess/examination-assess.component'
import { ExaminationTemplateComponent } from './examination-template/examination-template.component'
import { ExaminationAssesspaperComponent } from './examination-assesspaper/examination-assesspaper.component'
import { ExaminationCategoryComponent } from './category/category.component'

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
      path: 'examination-paper',
      component: ExaminationPaperComponent
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
    },{
      path: 'assess',
      component: ExaminationAssessComponent
    },{
      path: 'template',
      component: ExaminationTemplateComponent
    },{
      path: 'assess-paper',
      component: ExaminationAssesspaperComponent
    },{
      path: 'category',
      component: ExaminationCategoryComponent
    }
  ]
}]);
