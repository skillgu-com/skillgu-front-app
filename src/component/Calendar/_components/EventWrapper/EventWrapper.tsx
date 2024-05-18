import React, {FC} from 'react';

type Props = {
    children: React.ReactNode
}

const EventWrapper: FC<Props> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default EventWrapper;