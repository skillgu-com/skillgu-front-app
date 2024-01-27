import React, {useEffect, useRef, useState} from "react";

import styles from './CheckBoxGroup.module.scss'

// Definiowanie typów dla pojedynczej opcji i propsów komponentu
type Option = {
    label: string;
    value: number;
};

type CheckboxGroupProps = {
    options: Option[];
    label: string;
    onSelectedValuesChange: (selectedValues: string[]) => void;
    resetFilters: () => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({options, label, onSelectedValuesChange, resetFilters}) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const [isDropdownShown, setIsDropdownShown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Funkcja do obsługi zmiany stanu checkboxów
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedItems = {
            ...checkedItems,
            [event.target.name]: event.target.checked,
        };

        setCheckedItems(newCheckedItems);

        // Przekazuje wybrane wartości do funkcji zwrotnej
        const selectedValues = Object.keys(newCheckedItems).filter(key => newCheckedItems[key]);
        onSelectedValuesChange(selectedValues);
    };

    // Funkcja resetująca stan zaznaczeń
    // useEffect(() => {
    //     setCheckedItems({}); // Resetuje stan zaznaczeń
    // }, [resetFilters]);

    // Funkcja do przełączania widoczności dropdownu
    const toggleDropdown = () => setIsDropdownShown(prev => !prev);

    // Funkcja do obsługi kliknięcia poza dropdownem
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownShown(false);
        }
    };

    // Dodanie listenera po montowaniu komponentu
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Usunięcie listenera po odmontowaniu komponentu
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles['checkbox-dropdown']} ref={dropdownRef}>
            <div className={styles['dropdown-label']} onClick={toggleDropdown}>
                {label}
            </div>
            <div className={`${styles['dropdown-list']} ${isDropdownShown ? styles['show'] : ''}`}>
                {options.map((option, index) => (
                    <label key={index} className={styles['checkbox-item']}>
                        <input
                            type="checkbox"
                            name={option.value.toString()}
                            checked={checkedItems[option.value.toString()] || false}
                            onChange={handleChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;