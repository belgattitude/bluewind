import React from 'react';
import styled from '@emotion/styled';

type FooterProps = {
    text: string;
    children?: never;
};

const UnstyledFooter: React.FC<FooterProps> = (props: FooterProps) => {
    return <footer>{props.text}</footer>;
};

export const Footer = styled(UnstyledFooter)``;
