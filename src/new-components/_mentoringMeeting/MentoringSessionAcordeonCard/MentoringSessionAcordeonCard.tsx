import React, {FC} from "react";
import {MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";

type Props = MentoringSessionInListT & {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const MentoringSessionAcordeonCard: FC<Props> = () => {
    return <div>MentoringSessionAcordeonCard</div>
}

export default MentoringSessionAcordeonCard