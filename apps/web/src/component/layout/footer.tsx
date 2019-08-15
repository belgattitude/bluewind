import React from 'react';

type FooterProps = {
    text: string;
    children?: never;
};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    return <footer>{props.text}</footer>;
};

export default Footer;
