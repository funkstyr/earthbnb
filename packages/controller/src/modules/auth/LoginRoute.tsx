import * as React from "react";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import { graphql, ChildProps } from "react-apollo";
import gql from "graphql-tag";

import { MeQuery } from "../../genTypes";

type Props = RouteProps;

class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      return null;
    }

    if (data.me) {
      // user not logged in
      return (
        <Redirect
          to={{
            pathname: "/dash"
          }}
        />
      );
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery1 {
    me {
      email
    }
  }
`;

export const LoginRoute = graphql<Props, MeQuery>(meQuery)(C);
