import React from "react";

import { TextArea, TextAreaProps } from "../base";
import { ControlLabels, ControlLabelsProps } from "../LabeledControl";

type LabeledTextareaProps = Pick<ControlLabelsProps, "success" | "message" | "label" | "labelAdditionLength"> & TextAreaProps;

const LabeledTextareaComponent: React.FC<LabeledTextareaProps> = ({
  error,
  success,
  message,
  label,
  labelAdditionLength,
  ...inputProps
}) => (
  <ControlLabels
    error={error}
    success={success}
    message={message}
    label={label}
    labelAdditionLength={labelAdditionLength}
  >
    <TextArea {...inputProps} error={error} />
  </ControlLabels>
);

export const LabeledTextarea = React.memo(LabeledTextareaComponent);
