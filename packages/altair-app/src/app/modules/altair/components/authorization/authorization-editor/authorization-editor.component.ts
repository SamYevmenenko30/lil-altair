import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  inject,
  output,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {
  AUTHORIZATION_TYPE_LIST,
  AUTHORIZATION_TYPES,
  AuthorizationState,
  AuthorizationTypes,
  DEFAULT_AUTHORIZATION_TYPE,
} from 'altair-graphql-core/build/types/state/authorization.interface';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AUTHORIZATION_MAPPING } from '../authorizations';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-authorization-editor',
  templateUrl: './authorization-editor.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AuthorizationEditorComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  typeForm = this.formBuilder.group<{
    type: AuthorizationTypes;
  }>({
    type: AUTHORIZATION_TYPES.BEARER, // Changed from DEFAULT_AUTHORIZATION_TYPE
  });

  readonly authorizationState = input<AuthorizationState>();
  readonly authTypeChange = outputFromObservable(
    this.typeForm.valueChanges.pipe(
      map(({ type }) => type ?? DEFAULT_AUTHORIZATION_TYPE),
      distinctUntilChanged()
    )
  );
  readonly authDataChange = output<unknown>();
  AUTH_MAPPING = AUTHORIZATION_MAPPING;
  AUTH_TYPES = AUTHORIZATION_TYPE_LIST;

  ngOnInit(): void {
    // Always set the type to bearer regardless of what's in the state
    this.typeForm.patchValue({
      type: AUTHORIZATION_TYPES.BEARER,
    });

    // Disable the form control to prevent changes
    this.typeForm.controls.type.disable();
  }
}
