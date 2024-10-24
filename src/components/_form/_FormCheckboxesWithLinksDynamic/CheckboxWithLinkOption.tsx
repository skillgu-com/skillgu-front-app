import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, FieldValues, Path, Control, FormState, ControllerProps } from "react-hook-form";
import Typography from "@mui/material/Typography";
import styles from "../styles.module.scss";
import { StyledInputWrapper } from "../FormInputCheckbox/FormInputCheckbox.styles";
import Checkbox from "../../Checkbox/Checkbox"; // Importuj komponent Checkbox

interface CheckboxWithLinkOption {
    label: React.ReactNode;
    consentType: string; // Zamiast `value` użyjemy `consentType`
    link?: string;
}

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    label?: string;
    getOptions: (
        query: string,
        abortController: AbortController
    ) => Promise<readonly CheckboxWithLinkOption[]>;
    renderWithLinks?: boolean;
    controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
}

const CheckboxWithLinkOption = <T extends FieldValues>({
                                                                   control,
                                                                   name,
                                                                   label,
                                                                   getOptions,
                                                                   renderWithLinks,
                                                                   controllerProps,
                                                               }: Props<T>) => {
    const [options, setOptions] = useState<readonly CheckboxWithLinkOption[]>([]);
    const abortController = useMemo(() => new AbortController(), []);

    const updateOptions = useCallback(
        async (query: string) => {
            abortController.abort();
            const newOptions = await getOptions(query, abortController);
            setOptions(newOptions);
        },
        [abortController, getOptions]
    );

    useEffect(() => {
        updateOptions("");
    }, [updateOptions]);

    return (
        <StyledInputWrapper>
            {label && <Typography variant="buttonMd" color="secondary">{label}</Typography>}
            <Controller
                name={name}
                control={control}
                {...controllerProps}
                render={({ field }) => {
                    return (
                        <div className={styles.Checkboxes}>
                            {options.map((opt) => {
                                const isChecked = field.value.some(
                                    (selectedOption: CheckboxWithLinkOption) => selectedOption.consentType === opt.consentType
                                );

                                return (
                                    <Checkbox
                                        key={opt.consentType}
                                        id={opt.consentType}
                                        name={name}
                                        label={
                                            renderWithLinks ? (
                                                <>
                                                    {opt.label}{" "}
                                                    {opt.link && (
                                                        <a href={opt.link} target="_blank" rel="noopener noreferrer">
                                                            (link)
                                                        </a>
                                                    )}
                                                </>
                                            ) : (
                                                opt.label
                                            )
                                        }
                                        value={isChecked}
                                        valueChangeHandler={(name, { value }) => {
                                            const newValues = value
                                                ? [...field.value, opt]
                                                : field.value.filter(
                                                    (selectedOption: CheckboxWithLinkOption) => selectedOption.consentType !== opt.consentType
                                                );
                                            field.onChange(newValues);
                                        }}
                                        classes={styles.checkbox} // Dodaj istniejące klasy stylów
                                        fontVariant="caption"
                                        colorVariant="base-80"
                                    />
                                );
                            })}
                        </div>
                    );
                }}
            />
        </StyledInputWrapper>
    );
};

export default CheckboxWithLinkOption;
