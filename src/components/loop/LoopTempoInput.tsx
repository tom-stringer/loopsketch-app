import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../types/loop-types";
import { setTempo } from "../../redux/slices/loop-slice";

type Props = {
    loop: Loop;
};

const LoopTempoInput: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const [inputTempo, setInputTempo] = useState(String(loop.tempo));
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputTempo(String(loop.tempo));
    }, [loop.tempo]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTempo(event.target.value.replace(/\D/, ""));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputTempo !== "") {
            dispatch(setTempo({ id: loop.id, tempo: Number(inputTempo) }));
        } else {
            setInputTempo(String(loop.tempo));
        }
        input.current?.blur();
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <input
                className="input input__text loop-editor__tempo-input"
                type="text"
                onChange={(event) => handleChange(event)}
                value={inputTempo}
                ref={input}
            />
        </form>
    );
};

export default LoopTempoInput;
