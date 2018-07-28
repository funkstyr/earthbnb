// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    findListings: Array<IListing>;
    me: IUser | null;
  }

  interface IListing {
    __typename: 'Listing';
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    beds: number;
    baths: number;
    guests: number;
    latitude: number;
    longitude: number;
    amenities: Array<string>;
    pictureUrl: string;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    createListing: boolean;
    deleteListing: boolean;
    sendForgotPasswordEmail: string | null;
    forgotPasswordChange: Array<IError>;
    login: ILoginResponse;
    logout: boolean | null;
    register: Array<IError>;
  }

  interface ICreateListingOnMutationArguments {
    input: ICreateListingInput;
  }

  interface IDeleteListingOnMutationArguments {
    id: string;
  }

  interface ISendForgotPasswordEmailOnMutationArguments {
    email: string;
  }

  interface IForgotPasswordChangeOnMutationArguments {
    newPassword: string;
    key: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateListingInput {
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
    amenities: Array<string>;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface ILoginResponse {
    __typename: 'LoginResponse';
    errors: Array<IError>;
    sessionId: string | null;
  }

  interface IFile {
    __typename: 'File';
    id: string;
    path: string;
    filename: string;
    mimetype: string;
    encoding: string;
  }
}

// tslint:enable
