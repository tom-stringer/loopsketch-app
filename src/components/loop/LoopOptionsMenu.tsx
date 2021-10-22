import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loop } from "../../types/loop-types";
import { selectIsRemovingBars, setIsRemovingBars } from "../../redux/slices/loop-slice";
import { Modals, showModal } from "../../redux/slices/modal-slice";
import OptionsMenu from "../options/OptionsMenu";
import OptionsMenuLink from "../options/OptionsMenuLink";
import { isUnsaved } from "../../utils/loop-utils";
import { selectCurrentUser } from "../../redux/slices/authentication-slice";
import { useUpdateLoopMutation } from "../../redux/queries/loop-queries";

type Props = {
    loop: Loop;
};

const LoopOptionsMenu: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const [updateLoop] = useUpdateLoopMutation();
    const isRemovingBars = useSelector(selectIsRemovingBars);
    const user = useSelector(selectCurrentUser);

    const handleClickRemoveBars = () => {
        dispatch(setIsRemovingBars(!isRemovingBars));
    };

    const handleClickChangeInstruments = () => {
        dispatch(showModal(Modals.ADD_INSTRUMENT));
    };

    const handleClickAddBars = () => {
        dispatch(showModal(Modals.ADD_BARS));
    };

    const handleClickSave = () => {
        updateLoop(loop);
    };

    const handleClickSaveAs = () => {
        dispatch(showModal(Modals.SAVE_LOOP));
    };

    return (
        <OptionsMenu label="Options" className="loop-editor__options-menu">
            <OptionsMenuLink onClick={() => handleClickChangeInstruments()}>Change instruments </OptionsMenuLink>
            <OptionsMenuLink onClick={() => handleClickAddBars()}>Add bars</OptionsMenuLink>
            <OptionsMenuLink onClick={() => handleClickRemoveBars()}>
                {isRemovingBars ? "Stop removing bars" : "Remove bars"}
            </OptionsMenuLink>
            {user && !isUnsaved(loop) && <OptionsMenuLink onClick={() => handleClickSave()}>Save</OptionsMenuLink>}
            {user && isUnsaved(loop) && <OptionsMenuLink onClick={() => handleClickSaveAs()}>Save as</OptionsMenuLink>}
        </OptionsMenu>
    );
};

export default LoopOptionsMenu;
