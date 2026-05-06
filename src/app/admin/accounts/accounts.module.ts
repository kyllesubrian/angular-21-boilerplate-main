import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsRoutingModule } from './accounts-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    declarations: [ListComponent, AddEditComponent],
    imports: [CommonModule, FormsModule, RouterModule, AccountsRoutingModule]
})
export class AccountsModule { }