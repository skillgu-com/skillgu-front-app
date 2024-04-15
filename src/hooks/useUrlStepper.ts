import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";

type UseUrlStepperConfig = {
    stepLimit: number;
    defaultStep?: string;
    paramsKey?: string;
};

const validateAction = (newStep: number, stepLimit: number): boolean => {
    if(newStep < 0 || newStep > stepLimit) {
        if(process.env.NODE_ENV !== 'production') throw new Error(`Step must be between 0 and stepLimit (${stepLimit})`);
        return false;
    }
    return true;
}

const useUrlStepper = (config: UseUrlStepperConfig) => {
    const { stepLimit, defaultStep = '0', paramsKey = 'step' } = config;

    const [params, setParams] = useSearchParams({[paramsKey]: defaultStep});
    const step = useMemo(() => parseInt(params.get(paramsKey) || defaultStep), [params]);

    const onNextStep = () => {
        const newStep = step + 1;
        if(validateAction(newStep, stepLimit)) setParams({[paramsKey]: `${newStep}`});
    };

    const onPreviousStep = () => {
        const newStep = step - 1;
        if(validateAction(newStep, stepLimit)) setParams({[paramsKey]: `${newStep}`});
    };

    const onExactStep = (newStep: number) => {
        if(validateAction(newStep, stepLimit)) setParams({[paramsKey]: `${newStep}`});
    };

    return { step, onNextStep, onPreviousStep, onExactStep }
}

export default useUrlStepper;