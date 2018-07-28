import * as React from "react";
import { Card } from "antd";
import { withFindListings, WithFindListings } from "@earthbnb/controller";

export class FindListings extends React.PureComponent<WithFindListings> {
  displayListings = () => {
    return this.props.listings.map(l => {
      <Card key={`${l.id}-card`} cover={<img alt="" src={l.pictureUrl} />}>
        <Card.Meta title={l.name} description={l.description} />>
      </Card>;
    });
  };

  render() {
    return <div>{this.displayListings()}</div>;
  }
}

export default withFindListings(FindListings);
