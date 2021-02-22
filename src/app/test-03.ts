/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule, OnInit  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {
    public static number(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);

        const valid = hasNumber;
        if (!valid) {
            return { number: true}
        }
        return null;
    }

    public static upper(control: FormControl): ValidationResult {
        let hasUpper = /[A-Z]/.test(control.value);

        const valid = hasUpper;
        if (!valid) {
            return { upper: true }
        }
        return null;
    }

    public static lower(control: FormControl): ValidationResult {
        let hasLower = /[a-z]/.test(control.value);

        const valid = hasLower;
        if (!valid) {
            return { lower: true }
        }
        return null;
    }
}

@Component({
    selector : 'ng-app',
    template : `<form (ngSubmit)="onSubmit()" [formGroup]="form">
                    <h2>Login</h2>
                    <br/>
                    <input type="email" formControlName="email"/>
                    <br/>
                    <input type="password" value="" name="password" formControlName="password"/>
                    <button type="submit" [disabled]="!form.valid">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                    <div *ngIf="form.get('email').invalid" style="color:red">**Invalid email</div>
                    <div *ngIf="form.get('password').invalid" style="color: red">
                        **Invalid Password: <br/>
                        <ul>
                            <li *ngIf="form.get('password').errors.number" style="color:red">*Must have at least one number!</li>
                            <li *ngIf="form.get('password').errors.upper" style="color:red">*Must have at least an upper letter!</li>
                            <li *ngIf="form.get('password').errors.lower" style="color:red">*Must have at least a lower letter!</li>
                            <li *ngIf="form.get('password').errors.minlength" style="color:red">*Must have mininum 8 characters!</li>
                        </ul>
                    </div>
                </form>`
})
export class Test03Component  {

    logged_in = false;

    form = new FormGroup(
        {
            email: new FormControl('', Validators.email),
            password: new FormControl('', [
                PasswordValidator.number,
                PasswordValidator.upper,
                PasswordValidator.lower,
                Validators.minLength(8)
            ])
        }
    );

    onSubmit() {
        this.logged_in = true;
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations : [Test03Component]
})
export class Test03Module {};