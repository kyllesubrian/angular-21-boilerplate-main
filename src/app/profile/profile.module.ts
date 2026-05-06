import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';

@NgModule({
    declarations: [LayoutComponent, DetailsComponent, UpdateComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: LayoutComponent,
                children: [
                    { path: 'details', component: DetailsComponent },
                    { path: 'update', component: UpdateComponent },
                    { path: '', redirectTo: 'details', pathMatch: 'full' }
                ]
            }
        ])
    ]
})
export class ProfileModule { }