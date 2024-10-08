import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";
import { loadUserProfile, loadUserProfileFailure, loadUserProfileSuccess, updateUserProfile, updateUserProfileFailure, updateUserProfileSuccess } from "./user.action";
import { catchError, map, mergeMap, of } from "rxjs";





@Injectable()

export class UserEffects {


  constructor(private action$: Actions,
    private userservice: UserService,
    private route: Router
  ) {

  }


  loadUserProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUserProfile),
      mergeMap(() => this.userservice.getUserProfile().pipe(
        map(user => {
          console.log("User fetched in effect:", user);
          return loadUserProfileSuccess({ user });
        }),
        catchError(error => {
          console.error("Error fetching user profile:", error);
          return of(loadUserProfileFailure({ error }));
        })
      ))
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateUserProfile),
      mergeMap(action =>
        this.userservice.updatedData(action.user).pipe(
          map(user => updateUserProfileSuccess({ user })),
          catchError(error => {
            console.error("Update failed", error); // Log the error
            return of(updateUserProfileFailure({ error }));
          })
        )
      )
    )
  );
  

}