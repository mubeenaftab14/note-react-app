import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { Field, Formik, FieldProps } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FieldItem, Form } from "pages/AuthPages/components/FormComponents";
import { LabeledInput, LabeledTextarea, Modal, Separator } from "components";
import CustomButton from "components/Button";

type Todo = {
  title: string;
  description: string;
};
interface IProps {
  onClose?: () => void;
  onSubmit: (data: Todo) => void;
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

const AddNotesValidateionSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be 5 characters log")
    .max(50, "Maximum 50 characters are allowed"),
  description: yup
    .string()
    // .required('Description is required')
    // .min(30, 'Description must be 30 characters log')
    .max(1000, "Maximum 1000 characters are allowed"),
});

export const AddNotesModal = ({ onClose, onSubmit }: IProps) => {
  return (
    <Modal size="sm" onClose={onClose}>
      <Header>
        <HeaderTextContainer>
          <Title>Add Notes</Title>
        </HeaderTextContainer>
      </Header>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ title: "", description: "" }}
        validationSchema={AddNotesValidateionSchema}
      >
        <Form>
          <Separator />
          <FieldRowItem>
            <Field name="title">
              {({ field, meta }: FieldProps<string>) => (
                <LabeledInput
                  {...field}
                  light
                  labelAdditionLength={0}
                  placeholder="Title"
                  type="text"
                  error={!!meta.error && meta.touched}
                  message={meta.touched && meta.error}
                />
              )}
            </Field>
          </FieldRowItem>
          <Separator height="17px" />
          <FieldRowItem>
            <Field name="description">
              {({ field, meta }: FieldProps<string>) => (
                <LabeledTextarea
                  {...field}
                  light
                  labelAdditionLength={0}
                  placeholder="Description"
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
