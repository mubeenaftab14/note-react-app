import React from 'react';
import styled from "styled-components";

import { TickIcon } from "./TickIcon";

interface IProps {
    children: React.ReactNode;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Text = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #ffffff;
`;

export const PageItem: React.FC<IProps> = ({children}) => {
    return (
        <Container>
            <div style={{marginRight: '12px'}}>
                <TickIcon />
            </div>
            <Text>
                {children}
            </Text>
        </Container>
    );
};
