import React from "react";

//import {jsx} from '@emotion/core'
//import styled from '@emotion/styled'

import {keyframes} from '@emotion/core'
import {FaSpinner} from "react-icons/all";


const spin = keyframes({
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'},
})

export function Spinner(props: any) {
    return (
        <FaSpinner
            css={{animation: `${spin} 1s linear infinite`}}
            aria-label="loading"
            {...props}
        />
    )
}

export function FullPageSpinner() {
    return (
        <div css={{marginTop: '3em', fontSize: '4em'}}>
            <Spinner />
        </div>
    )
}
