import React from 'react';
import styled from "styled-components";

import { Main } from "../../../components/Main";

interface IProps {
    children?: React.ReactNode;
}

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 154px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const AuthContainer: React.FC<IProps> = ({children}) => {
    return (
        <Main>
            <Container>{children}</Container>
        </Main>
    );
};