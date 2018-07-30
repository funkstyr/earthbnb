

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  email: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery1
// ====================================================

export interface MeQuery1_me {
  email: string;
}

export interface MeQuery1 {
  me: MeQuery1_me | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePasswordMutation
// ====================================================

export interface ChangePasswordMutation_forgotPasswordChange {
  path: string;
  message: string;
}

export interface ChangePasswordMutation {
  forgotPasswordChange: ChangePasswordMutation_forgotPasswordChange[] | null;
}

export interface ChangePasswordMutationVariables {
  newPassword: string;
  key: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateListingMutation
// ====================================================

export interface CreateListingMutation {
  createListing: boolean;
}

export interface CreateListingMutationVariables {
  name: string;
  category: string;
  description: string;
  picture?: any | null;
  price: number;
  beds: number;
  baths: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindListingsQuery
// ====================================================

export interface FindListingsQuery_findListings_owner {
  id: string;
  email: string;
}

export interface FindListingsQuery_findListings {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  beds: number;
  baths: number;
  guests: number;
  price: number;
  amenities: string[];
  owner: FindListingsQuery_findListings_owner;
}

export interface FindListingsQuery {
  findListings: FindListingsQuery_findListings[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ForgotPasswordMutation
// ====================================================

export interface ForgotPasswordMutation {
  sendForgotPasswordEmail: string | null;
}

export interface ForgotPasswordMutationVariables {
  email: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_errors {
  path: string;
  message: string;
}

export interface LoginMutation_login {
  errors: LoginMutation_login_errors[] | null;
  sessionId: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  path: string;
  message: string;
}

export interface RegisterMutation {
  register: RegisterMutation_register[] | null;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================