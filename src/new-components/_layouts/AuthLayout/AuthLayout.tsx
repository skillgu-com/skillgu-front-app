import React, {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
}

const AuthLayout: FC<Props> = ({ children }) => {


    return (
        <div>
            AUTH LAYOUT
            {children}
        </div>
    );
}

export default AuthLayout;