import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";

import { Field, FieldProps, Formik } from "formik";
import { AuthContainer } from "../components/AuthContainer";
import { FieldItem, Form } from "../components/FormComponents";
import { LabeledInput, Separator, LoadingButton } from "../../../components";
import { RoutePaths } from "../../routePaths";
import useRouter from "hooks/useRouter";

const FormContainer = styled.div`
  max-width: 550px;
  width: 100%;
  padding: 0 15px;
`;

const Heading = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
`;

const TextContainer = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LinkText = styled(Link)`
  color: #8c49f7;
`;

const SignupPageValidationSchema = yup.object().shape({
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
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .max(16, "Maximum 16 characters are allowed"),
});

export const SignupPage: React.FC = () => {
  const { push } = useRouter();

  return (
    <AuthContainer>
      <FormContainer>
        <Heading>Signup</Heading>
        <Separator height="30px" />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupPageValidationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(`/auth/register`, values);
            } catch (error) {
              console.error(error);
            }

            push(`${RoutePaths.Login}`);
          }}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting }) => (
            <Form>
              <FieldItem bottom="17">
                <Field name="firstName">
                  {({ field, meta }: FieldProps<string>) => (
                    <LabeledInput
                      {...field}
                      labelAdditionLength={0}
                      placeholder="First Name"
                      type="text"
                      error={!!meta.error && meta.touched}
                      message={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </FieldItem>
              <FieldItem bottom="17">
                <Field name="lastName">
                  {({ field, meta }: FieldProps<string>) => (
                    <LabeledInput
                      {...field}
                      labelAdditionLength={0}
                      placeholder="Last Name"
                      type="text"
                      error={!!meta.error && meta.touched}
                      message={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </FieldItem>
              <FieldItem bottom="17">
                <Field name="email">
                  {({ field, meta }: FieldProps<string>) => (
                    <LabeledInput
                      {...field}
                      labelAdditionLength={0}
                      placeholder="Email"
                      type="email"
                      error={!!meta.error && meta.touched}
                      message={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </FieldItem>
              <FieldItem bottom="30">
                <Field name="password">
                  {({ field, meta }: FieldProps<string>) => (
                    <LabeledInput
                      {...field}
                      labelAdditionLength={0}
                      placeholder="Password"
                      type="password"
                      error={!!meta.error && meta.touched}
                      message={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </FieldItem>
              <LoadingButton
                full
                size="lg"
                type="submit"
                isLoading={isSubmitting}
              >
                Signup
              </LoadingButton>
            </Form>
          )}
        </Formik>
        <Separator />
        <TextContainer>
          Already have an account?&nbsp;&nbsp;
          <LinkText to={`${RoutePaths.Login}`}>Log In</LinkText>
        </TextContainer>
      </FormContainer>
    </AuthContainer>
  );
};
