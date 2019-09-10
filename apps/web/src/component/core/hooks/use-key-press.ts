import { useState, useEffect, useCallback } from 'react';

type KeyName =
    | 'Backspace'
    | 'Tab'
    | 'Escape'
    | 'Space'
    | 'Home'
    | 'End'
    | 'ArrowLeft'
    | 'ArrowDown'
    | 'ArrowUp'
    | 'ArrowRight'
    | 'Delete'
    | 'Enter'
    | string;

export function useKeyPress(targetKey: KeyName, element = window) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    // If pressed key is our target key then set to true
    const downHandler = useCallback(
        ({ key }: KeyboardEvent) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        },
        [targetKey]
    );

    // If released key is our target key then set to false
    const upHandler = useCallback(
        ({ key }: KeyboardEvent) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        },
        [targetKey]
    );

    // Add event listeners
    useEffect(() => {
        element.addEventListener('keydown', downHandler);
        element.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            element.removeEventListener('keydown', downHandler);
            element.removeEventListener('keyup', upHandler);
        };
    }, [element, downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
}
