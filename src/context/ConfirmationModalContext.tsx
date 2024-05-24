import React, {ReactNode, useCallback, useContext, useMemo, useRef, useState} from "react";
import {createContext} from "react";
import {ButtonProps, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import FullSizeIconButton from "@newComponents/FullSizeIconButton/FullSizeIconButton";
import {ReactComponent as CloseIcon} from "src/assets/icons/svg/close.svg";

// TODO expand it for other use cases
type CloseResponse = {
    decision: boolean;
    message?: string;
}

type ModalButton = {
    buttonProps?: ButtonProps,
    label: string | ReactNode,
    action: CloseResponse,
};

type ModalConfig = {
    title: string | ReactNode,
    body: string | ReactNode,
    buttons: ModalButton[],
};

type ShowConfirmationModal = (options: ModalConfig) => Promise<CloseResponse>;

type ConfirmationModalContextType = {
    showConfirmationDialog: ShowConfirmationModal;
};

const ConfirmationModalContext = createContext<ConfirmationModalContextType>({
    showConfirmationDialog: () => new Promise(() => {
    })
});

type Props = {
    children: ReactNode;
};

export const ConfirmationModalProvider: React.FC<Props> = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<null | ModalConfig>(null);

    const awaitingConfirmation = useRef<any>(null);

    // close action - timeout to prevent empty modal flash
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalConfig(null), 150);
    };

    const showConfirmationDialog: ShowConfirmationModal = useCallback(config => {
        setModalConfig(config);
        setIsModalOpen(true);
        return new Promise(resolve => {
            awaitingConfirmation.current = {resolve};
        });
    }, [setIsModalOpen, setModalConfig, awaitingConfirmation]);

    const onCancel = (message = '') => {
        if (awaitingConfirmation.current) {
            awaitingConfirmation.current.resolve({decision: false, message});
        }
        closeModal();
    };

    const onConfirm = (message = '') => {
        if (awaitingConfirmation.current) {
            awaitingConfirmation.current.resolve({decision: true, message});
        }
        closeModal();
    };

    const value = useMemo(() => ({
        showConfirmationDialog
    }), [showConfirmationDialog]);

    return (
        <ConfirmationModalContext.Provider value={value}>
            {children}
            <Dialog open={isModalOpen} onClose={() => onCancel('close-outside')} PaperProps={{sx:{borderRadius: '20px'}}} >
                {modalConfig && (
                    <Box sx={{ pt: 4, pr: 4, pb: 7, pl: 4, display: 'grid'  }} >
                        <FullSizeIconButton onClick={() => onCancel('close-button')} sx={{ justifySelf: 'flex-end'}}>
                            <CloseIcon/>
                        </FullSizeIconButton>
                        <DialogTitle>
                            <Typography variant='h3'>
                                {modalConfig.title}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant='body2'>
                                {modalConfig.body}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Box sx={{
                                display: 'grid',
                                gap: 3,
                                width: '100%',
                                justifyItems: 'stretch',
                                justifyContent: 'stretch'
                            }}>
                                {modalConfig.buttons.map(({buttonProps, action, label}) => {
                                    const onClick = () => action.decision ? onConfirm(action.message) : onCancel(action.message);
                                    return <Button {...buttonProps} onClick={onClick}>{label}</Button>
                                })}
                            </Box>
                        </DialogActions>
                    </Box>
                )}
            </Dialog>
        </ConfirmationModalContext.Provider>
    );
};

const useConfirmationModalContext = () => useContext(ConfirmationModalContext);

export default useConfirmationModalContext;
