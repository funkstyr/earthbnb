import * as React from "react";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import { graphql, ChildProps } from "react-apollo";
import gql from "graphql-tag";

import { MeQuery } from "../../genTypes";

type Props = RouteProps;

export class AuthRoute extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeprops: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      return null;
    }

    if (!data.me || !data.me.email) {
      return <Redirect to="/login" />;
    }

    const Component = component as any;
    return <Component {...routeprops} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

export default graphql<Props, MeQuery>(meQuery)(AuthRoute);
