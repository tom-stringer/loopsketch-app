import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../types/loop-types";
import { addInstrument } from "../../redux/slices/loop-slice";
import { instrumentMap } from "../../utils/loop-utils";

type Props = {
    loop: Loop;
};

// Legacy code. Unused now but I spent too long on this to delete.
const AddInstrumentDropDown: FunctionComponent<Props> = ({ loop }) => {
    const getOptions = () => {
        return Object.keys(instrumentMap).filter((instrument) => !Object.keys(loop.instruments).includes(instrument));
    };
    const dispatch = useDispatch();
    const [options, setOptions] = useState(getOptions());
    const [selected, setSelected] = useState(options[0]);

    useEffect(() => {
        setOptions(getOptions());
        setSelected(getOptions()[0]);
    }, [loop.instruments]);

    const handleSubmit = () => {
        dispatch(addInstrument({ id: loop.id, instrument: selected }));
    };

    if (options.length === 0) {
        return null;
    }

    return (
        <div>
            <select value={selected} onChange={(event) => setSelected(event.target.value)}>
                {options.map((instrument) => (
                    <option value={instrument}>{instrumentMap[instrument]}</option>
                ))}
            </select>
            <button onClick={() => handleSubmit()}>+</button>
        </div>
    );
};

export default AddInstrumentDropDown;
