import React from "react";

import { Input, InputProps } from "../base";
import { ControlLabels, ControlLabelsProps } from "../LabeledControl";

type LabeledInputProps = Pick<ControlLabelsProps, "success" | "message" | "label" | "labelAdditionLength"> & InputProps;

const LabeledInputComponent: React.FC<LabeledInputProps> = ({
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
    <Input {...inputProps} error={error} focusedStyle />
  </ControlLabels>
);

export const LabeledInput = React.memo(LabeledInputComponent);
