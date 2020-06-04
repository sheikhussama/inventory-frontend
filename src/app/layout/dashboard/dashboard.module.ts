import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent, NotificationComponent, TimelineComponent } from './components';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [CommonModule,DashboardRoutingModule],
    declarations: [DashboardComponent, TimelineComponent, NotificationComponent, ChatComponent]
})
export class DashboardModule {}
