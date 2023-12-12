import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Field, FieldProps, Formik } from "formik";
import { AuthContainer } from "../components/AuthContainer";
import { FieldItem, Form } from "../components/FormComponents";
import { LabeledInput, Separator, LoadingButton } from "components";
import { RoutePaths } from "pages/routePaths";
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

const LoginPageValidationSchema = yup.object().shape({
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

export const LoginPage: React.FC = () => {
  const { push } = useRouter();
  const navigate = useNavigate();
  const checkUserToken = () => {
    const userToken = localStorage.getItem("Token");
    if (!!userToken) {
      return navigate("/notes");
    }
  };
  useEffect(() => {
    checkUserToken();
  }, []);

  return (
    <AuthContainer>
      <FormContainer>
        <Heading>Login</Heading>
        <Separator height="30px" />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginPageValidationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(`/auth/login`, values);
              const token = response.data.access_token;
              localStorage.setItem("Token", token);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
            } catch (error) {
              console.error(error);
            }
            push(`/${RoutePaths.Notes}`);
          }}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting }) => (
            <Form>
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
                Login
              </LoadingButton>
            </Form>
          )}
        </Formik>
        <Separator />
        <TextContainer>
          or&nbsp;&nbsp;
          <LinkText to={`/${RoutePaths.Signup}`}>create an account</LinkText>
        </TextContainer>
      </FormContainer>
    </AuthContainer>
  );
};
