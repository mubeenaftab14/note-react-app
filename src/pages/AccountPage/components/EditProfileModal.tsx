import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { Field, Formik, FieldProps } from "formik";
import axios from "axios";

import { FieldItem, Form } from "../../AuthPages/components/FormComponents";
import { LabeledInput, Modal, Separator } from "../../../components";
import CustomButton from "../../../components/Button";

interface IProps {
  onClose?: () => void;
}

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const HeaderTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #ffffff;
`;

const FieldRowItem = styled(FieldItem)`
  border-radius: 10px;
  margin-bottom: 0;
`;

const Footer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

const EditProfileValidateionSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be 3 characters long")
    .max(24, "Maximum 24 characters are allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be 3 characters long")
    .max(24, "Maximum 24 characters are allowed"),
});

export const EditProfileModal: React.FC<IProps> = ({ onClose }) => {
  return (
    <Modal size="sm" onClose={onClose}>
      <Header>
        <HeaderTextContainer>
          <Title>Edit Profile</Title>
        </HeaderTextContainer>
      </Header>
      <Formik
        onSubmit={async (values) => {
          try {
            const response = await axios.patch("/user", values);
            // console.log(response.data); // Log the response data
          } catch (error) {
            console.error(error);
          }
          onClose?.();
        }}
        initialValues={{ firstName: "", lastName: "" }}
        validationSchema={EditProfileValidateionSchema}
      >
        <Form>
          <Separator />
          <FieldRowItem>
            <Field name="firstName">
              {({ field, meta }: FieldProps<string>) => (
                <LabeledInput
                  {...field}
                  light
                  labelAdditionLength={0}
                  placeholder="First name"
                  type="text"
                  error={!!meta.error && meta.touched}
                  message={meta.touched && meta.error}
                />
              )}
            </Field>
          </FieldRowItem>
          <Separator height="17px" />
          <FieldRowItem>
            <Field name="lastName">
              {({ field, meta }: FieldProps<string>) => (
                <LabeledInput
                  {...field}
                  light
                  labelAdditionLength={0}
                  placeholder="Last name"
                  error={!!meta.error && meta.touched}
                  message={meta.touched && meta.error}
                />
              )}
            </Field>
          </FieldRowItem>
          <Separator />
          <Footer>
            <CustomButton
              style={{ minWidth: "100px" }}
              variant="outlined-primary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              style={{ minWidth: "100px" }}
              variant="primary"
              type="submit"
              isLoading={false}
            >
              Submit
            </CustomButton>
          </Footer>
        </Form>
      </Formik>
    </Modal>
  );
};
