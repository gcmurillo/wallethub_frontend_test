/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CurrencyPipe, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Loan Amount: </b> 
                        <input type="text" style="display: 'inline';" [(ngModel)]="loan_amount" 
                        (ngModelChange)="loanChange($event)"/> <br/>
                    <div *ngIf="!NA">
                        <b>Monthly Payment:</b> 
                        {{ monthly_payment_str }} 
                        <br/>
                        <b>Late Payment Fee : {{ late_payment_str }}</b> <br/>
                    </div>
                    <div *ngIf="NA">
                        <b>Monthly Payment:</b> N/A <br/>
                        <b>Late Payment Fee : N/A </b> <br/>
                    </div>
                </div>`
})
export class Test01Component implements OnInit {

    loan_amount:number = 1000;
    monthly_payment = 200;
    monthly_payment_str = "";
    late_payment = 10;
    late_payment_str = "";
    NA = false;

    constructor(private currencyPipe: CurrencyPipe) {}

    ngOnInit() {
        this.monthly_payment_str = this.currencyPipe.transform(this.monthly_payment, "USD");
        this.late_payment_str = this.currencyPipe.transform(this.late_payment, "USD");
    }

    loanChange(obj) {
        if (!this.loan_amount.toString() || this.loan_amount == 0) {
            this.NA = true;
        } else {
            this.NA = false;
            this.monthly_payment = this.loan_amount * 0.02;
            this.monthly_payment_str = this.currencyPipe.transform(this.monthly_payment, "USD");
            this.late_payment = this.loan_amount * 0.05;
            this.late_payment_str = this.currencyPipe.transform(this.late_payment, "USD");
        }
    }

}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ]),
        FormsModule,
        CommonModule
    ],
    declarations : [Test01Component],
    providers: [CurrencyPipe],
})
export class Test01Module {}