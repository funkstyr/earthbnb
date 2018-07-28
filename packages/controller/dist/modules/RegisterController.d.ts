import * as React from "react";
import { RegisterMutationVariables } from "../genTypes";
import { NormalizedErrorMap } from "../types";
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props, React.ComponentState>;
export {};
