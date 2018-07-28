import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";
import { TagField } from "../../../shared/TagField";

// export class AmenitySet extends React.PureComponent {
//   render() {
//     return (
//       <React.Fragment>
//         <Field
//           name="latitute"
//           placeholder="Latitude"
//           label="Latitude"
//           useNumberComponent={true}
//           type="input"
//           component={InputField}
//         />
//         <Field
//           name="longitute"
//           placeholder="Logitude"
//           label="Longitude"
//           useNumberComponent={true}
//           type="input"
//           component={InputField}
//         />
//         <Field
//           name="ammenities"
//           placeholder="Ammenities"
//           label="Amenities"
//           component={TagField}
//         />
//       </React.Fragment>
//     );
//   }
// }

export const AmenitySet = () => (
  <React.Fragment>
    <Field
      name="latitute"
      placeholder="Latitude"
      label="Latitude"
      useNumberComponent={true}
      type="input"
      component={InputField}
    />
    <Field
      name="longitute"
      placeholder="Logitude"
      label="Longitude"
      useNumberComponent={true}
      type="input"
      component={InputField}
    />
    <Field
      name="ammenities"
      placeholder="Ammenities"
      label="Amenities"
      component={TagField}
    />
  </React.Fragment>
);
