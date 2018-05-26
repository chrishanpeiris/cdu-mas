import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { StudentHomePage } from '../pages/student-home/student-home';
import { LectureHomePage } from '../pages/lecture-home/lecture-home';
import { ViewQRCodePage } from '../pages/view-qrcode/view-qrcode';
import { ProfilePage } from '../pages/profile/profile';
import { MyAttendancePage } from '../pages/my-attendance/my-attendance';
import { ViewCoursesPage } from '../pages/view-courses/view-courses';
import { CoursePage } from '../pages/course/course';
import { ScanQRCodePage } from '../pages/scan-qrcode/scan-qrcode';
import { SearchAttendancePage } from '../pages/search-attendance/search-attendance';
import { ViewAttendancePage } from '../pages/view-attendance/view-attendance';
import { WelcomePage } from '../pages/welcome/welcome';
import { TabsStudentPage } from '../pages/tabs-student/tabs-student';
import { TabsLecturePage } from '../pages/tabs-lecture/tabs-lecture';
import { MarkAttendancePage } from '../pages/mark-attendance/mark-attendance';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HttpClientModule } from '@angular/common/http';
import {NgxQRCodeModule} from "ngx-qrcode3";
import { BarcodeScanner} from '@ionic-native/barcode-scanner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AttendanceProvider } from '../providers/attendance/attendance';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    UpdateProfilePage,
    ChangePasswordPage,
    ForgotPasswordPage,
    StudentHomePage,
    LectureHomePage,
    ViewQRCodePage,
    ProfilePage,
    MyAttendancePage,
    ViewCoursesPage,
    CoursePage,
    ScanQRCodePage,
    SearchAttendancePage,
    ViewAttendancePage,
    WelcomePage,
    TabsStudentPage,
    TabsLecturePage,
    MarkAttendancePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    UpdateProfilePage,
    ChangePasswordPage,
    ForgotPasswordPage,
    StudentHomePage,
    LectureHomePage,
    ViewQRCodePage,
    ProfilePage,
    MyAttendancePage,
    ViewCoursesPage,
    CoursePage,
    ScanQRCodePage,
    SearchAttendancePage,
    ViewAttendancePage,
    WelcomePage,
    TabsStudentPage,
    TabsLecturePage,
    MarkAttendancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BarcodeScanner,
    AttendanceProvider,
    InAppBrowser
  ]
})
export class AppModule {}
