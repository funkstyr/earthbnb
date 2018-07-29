import * as React from "react";
import { Card } from "antd";
import { withFindListings, WithFindListings } from "@earthbnb/controller";

export class FindListings extends React.PureComponent<WithFindListings> {
  displayListings = () => {
    const { listings } = this.props;

    return listings.map(l => {
      return (
        <Card
          key={`${l.id}-card`}
          style={{ flex: "1 1 auto", margin: 15 }}
          cover={<img alt="" src={l.pictureUrl} />}
        >
          <Card.Meta title={l.name} description={l.description} />
        </Card>
      );
    });
  };

  render() {
    return <div style={{ display: "flex" }}>{this.displayListings()}</div>;
  }
}

export default withFindListings(FindListings);
