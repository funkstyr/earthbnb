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
          style={{
            flex: "1 1 auto",
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "25%",
            flexFlow: "row wrap",
            justifyContent: "center",
            margin: 15
          }}
          cover={<img alt="" src={l.pictureUrl} style={{ maxWidth: 500 }} />}
        >
          <Card.Meta title={l.name} description={l.description} />
        </Card>
      );
    });
  };

  render() {
    return (
      <div style={{ display: "flex", margin: 10, marginTop: 55 }}>
        {this.displayListings()}
      </div>
    );
  }
}

export default withFindListings(FindListings);
