import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { AlertService, Alert, AlertType } from '../_services/alert.service';

@Component({ selector: 'app-alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    alerts: Alert[] = [];
    private subscription!: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }
                this.alerts.push(alert);
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() { 
        this.subscription.unsubscribe(); 
    }

    removeAlert(alert: Alert) { 
        this.alerts = this.alerts.filter(x => x !== alert); 
    }

    cssClass(alert: Alert) {
        const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];
        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        };
        classes.push(alertTypeClass[alert.type!]);
        return classes.join(' ');
    }
}