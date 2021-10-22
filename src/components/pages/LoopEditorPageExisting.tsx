import React, { FunctionComponent } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import LoopEditor from "../loop/LoopEditor";
import ParamUtils from "../../utils/ParamUtils";
import { useGetLoopQuery } from "../../redux/queries/loop-queries";
import { useSelector } from "react-redux";
import { selectLoops } from "../../redux/slices/loop-slice";

type Params = {
    loopId: string;
};

const LoopEditorPageExisting: FunctionComponent<RouteComponentProps<Params>> = () => {
    // Get ID from parameters.
    const params = useParams<Params>();
    const [isValidId, loopId] = ParamUtils.validateId(params.loopId);

    // Query for loop.
    const { isSuccess } = useGetLoopQuery(loopId, { skip: !isValidId });
    const loops = useSelector(selectLoops);
    const loop = isSuccess ? loops[loopId] : undefined;

    if (isValidId) {
        if (loop) {
            return <LoopEditor loop={loop} />;
        } else {
            return <p>Waiting</p>;
        }
    } else {
        return <p>Nah</p>;
    }
};

export default LoopEditorPageExisting;
