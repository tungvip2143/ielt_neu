import React from "react";

import { FieldArray } from "formik";

interface ArrayFieldI {
  name: string;
  Component: React.ReactNode | any;
  [key: string]: any;
}

const ArrayField = (props: ArrayFieldI) => {
  const { name, Component, ...remainProps } = props;
  if (!Component) {
    return null;
  }

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => <Component arrayHelpers={arrayHelpers} name={name} {...remainProps} />}
    />
  );
};

export default React.memo(ArrayField);
