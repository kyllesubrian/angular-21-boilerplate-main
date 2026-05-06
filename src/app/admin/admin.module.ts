import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';
import { SubnavComponent } from './subnav.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule],
    declarations: [LayoutComponent, OverviewComponent, SubnavComponent]
})
export class AdminModule { }