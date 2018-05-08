import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsLecturePage } from './tabs-lecture';

@NgModule({
  declarations: [
    TabsLecturePage,
  ],
  imports: [
    IonicPageModule.forChild(TabsLecturePage),
  ]
})
export class TabsLecturePageModule {}
