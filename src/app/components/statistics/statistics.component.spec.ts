import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutComponent } from './../static/about/about.component';
import { AppRoutingModule } from './../../app-routing.module';
import { ContactsComponent } from './../static/contacts/contacts.component';
import { CoreModule } from './../../core/core.module';
import { GalleryComponent } from './../gallery/gallery.component';
import { HomeComponent } from './../home/home.component';
import { ImageDetailComponent } from './../gallery/image-detail/image-detail.component';
import { ImageEditComponent } from './../gallery/image-edit/image-edit.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfoComponent } from './../info/info.component';
import { LoginComponent } from './../auth/login/login.component';
import { ProfileComponent } from './../profile/profile.component';
import { RegisterComponent } from './../auth/register/register.component';
import { SharedModule } from './../../shared/shared.module';
import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsComponent,
        RegisterComponent,
        ContactsComponent,
        LoginComponent,
        HomeComponent,
        InfoComponent,
        GalleryComponent,
        ImageDetailComponent,
        ImageEditComponent,
        ProfileComponent,
        AboutComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule.forRoot(),
        SharedModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
