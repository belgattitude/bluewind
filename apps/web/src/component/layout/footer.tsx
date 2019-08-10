import React from 'react';

type FooterProps = {
    text: string;
};

const Footer: React.FC<FooterProps> = props => {
    return <footer>{props.text}</footer>;
};

export default Footer;
