import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { IntroComponent } from './components/intro/intro.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';



@NgModule({
  declarations: [
    AboutComponent,
    SkillsComponent,
    ContactComponent,
    IntroComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
