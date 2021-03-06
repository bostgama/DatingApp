import { Injectable } from "@angular/core";
import {User} from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService: UserService, private authService:AuthService,
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error=> {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}