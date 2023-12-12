import React from 'react';
import styled from "styled-components";

interface IStyleProps {
    width?: string;
    height?: string;
    fontSize?: string;
    isRounded?: boolean;
}

interface IProps extends IStyleProps {
    name: string;
}

const NameContainer = styled.div<IStyleProps>`
    max-width: ${({width}) => width ? width : '44px'};
    max-height: ${({width}) => width ? width : '44px'};
    min-width: ${({height}) => height ? height : '44px'};
    min-height: ${({height}) => height ? height : '44px'};
    border-radius: ${({isRounded}) => isRounded ? '50%' : '10px'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 700;
    font-size: ${({fontSize}) => fontSize ? fontSize : '14px'};
    line-height: 20px;
    color: #FFFFFF;
    background: linear-gradient(92.31deg, #8C49F7 0%, #6C53FF 100%), #D9D9D9;
`;

const getNameCharacters = (name: string): string => {
    const splittedName = name.split(' ');
    if (splittedName.length >= 2) {
        return `${name.split(' ')[0].substring(0, 1)} ${name.split(' ')[1].substring(0, 1)}`;
    } else {
        return "D G";
    }
}

export const UserName: React.FC<IProps> = (props) => {
    return (
        <NameContainer {...props}>
            {getNameCharacters(props.name).toUpperCase()}
        </NameContainer>
    );
};