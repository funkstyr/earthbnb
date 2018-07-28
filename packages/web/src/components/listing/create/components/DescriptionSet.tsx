import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";

// export class DescriptionSet extends React.PureComponent {
//   render() {
//     return (
//       <React.Fragment>
//         <Field
//           name="price"
//           placeholder="Price"
//           label="Price"
//           useNumberComponent={true}
//           type="input"
//           component={InputField}
//         />
//         <Field
//           name="beds"
//           placeholder="Beds"
//           label="Beds"
//           useNumberComponent={true}
//           type="input"
//           component={InputField}
//         />
//         <Field
//           name="baths"
//           placeholder="Baths"
//           label="Baths"
//           useNumberComponent={true}
//           type="input"
//           component={InputField}
//         />
//         <Field
//           name="guests"
//           placeholder="Guests"
//           label="Guests"
//           useNumberComponent={true}
//           type="input"
//           component={InputField}
//         />
//       </React.Fragment>
//     );
//   }
// }

export const DescriptionSet = () => (
  <React.Fragment>
    <Field
      name="price"
      placeholder="Price"
      label="Price"
      useNumberComponent={true}
      type="input"
      component={InputField}
    />
    <Field
      name="beds"
      placeholder="Beds"
      label="Beds"
      useNumberComponent={true}
      type="input"
      component={InputField}
    />
    <Field
      name="baths"
      placeholder="Baths"
      label="Baths"
      useNumberComponent={true}
      type="input"
      component={InputField}
    />
    <Field
      name="guests"
      placeholder="Guests"
      label="Guests"
      useNumberComponent={true}
      type="input"
      component={InputField}
    />
  </React.Fragment>
);
