import React, { FunctionComponent, useEffect } from "react";
import LoopEditor from "../loop/LoopEditor";
import { useDispatch, useSelector } from "react-redux";
import { editNewLoop, selectLoops } from "../../redux/slices/loop-slice";
import { NEW_LOOP_ID } from "../../utils/loop-utils";

const LoopEditorPageNew: FunctionComponent = () => {
    const dispatch = useDispatch();
    const loop = useSelector(selectLoops)[NEW_LOOP_ID];

    useEffect(() => {
        dispatch(editNewLoop());
    }, []);

    return loop ? <LoopEditor loop={loop} /> : null;
};

export default LoopEditorPageNew;
