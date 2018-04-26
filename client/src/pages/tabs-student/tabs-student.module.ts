import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsStudentPage } from './tabs-student';

@NgModule({
  declarations: [
    TabsStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsStudentPage),
  ],
})
export class TabsStudentPageModule {}
