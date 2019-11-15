import React from 'react';
import styled from '@emotion/styled';

type AvatarProps = {
    src: string | null;
    alt?: string;
    defaultSrc?: string;
    size?: string | number;
    className?: string;
};
export const UnstyledAvatar: React.FC<AvatarProps> = props => {
    const {size, className, alt, src = props.defaultSrc, ...innerProps} = props;
    return (
        <div className={className}>
            {src && <img src={src} alt={alt}  {...innerProps} />}
            {!src && <div className={'placeholder'}>EX</div>}
        </div>
    );
};

export const Avatar = styled(UnstyledAvatar)`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
        border-radius: 50%;
        width: ${props => props.size};
        height: ${props => props.size};
        object-fit: cover;
        border: 1px solid #E9E9E9;
  }
  .placeholder {  
        border-radius: 50%;
        width: ${props => props.size};
        height: ${props => props.size};        
        border: 1px solid #E9E9E9;  
        text-align: center;
        text-transform: uppercase;
        font-weight: 500;
  }
`;
