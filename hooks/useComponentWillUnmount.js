import { useEffect, useRef } from "react";

/**
 * A custom hook that imitates the behavior of componentWillUnmount
 * @param {Function} callback The function to run on Unmount
 * @param  {...any} callbackArguments The arguments of the callback
 */
const useComponentWillUnmount = (callback, ...callbackArguments) => {
    // We store callback in it's own ref
    const callbackRef = useRef();
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // We store callbackArguments in their own ref
    const callbackArgumentsRef = useRef();
    useEffect(() => {
        callbackArgumentsRef.current = callbackArguments;
    }, [callbackArguments]);

    useEffect(() => () => {
        const callbackArguments = callbackArgumentsRef.current;
        const callback = callbackRef.current;
        if (callback) {
            callback(...callbackArguments);
        } else {
            console.warn("useComponentWillUnmount hook was used but no callback was defined.");
        }
    }, []);
};

export default useComponentWillUnmount;