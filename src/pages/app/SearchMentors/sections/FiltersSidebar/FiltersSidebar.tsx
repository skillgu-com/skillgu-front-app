import React from "react";
import { 
    FilterName,
    FiltersSelected,
    Option,
  } from "@customTypes/mentor";
import styles from "./FiltersSidebar.module.scss";
import { FiltersCheckboxes, FiltersGroup, FiltersRange } from "../../elements";
import { Terms } from "@customTypes/mentor";

type FiltersSidebarProps = {
  terms: Terms;
  filtersSelected: FiltersSelected;
  handleChange: (filters: Partial<FiltersSelected>) => void;
};

export const FiltersSidebar = ({
  terms,
  filtersSelected,
  handleChange,
}: FiltersSidebarProps) => {
  return (
    <div className={styles.wrapper}>
      <FiltersGroup title="Cena za 1h">
        <FiltersRange
          min={0}
          max={299}
          valueMin={filtersSelected.priceMin}
          valueMax={filtersSelected.priceMax}
          handleChange={(min: number, max: number) => {
            handleChange({
              priceMin: min,
              priceMax: max,
            })
          }}
        />
      </FiltersGroup>
      <FiltersGroup title="Kategoria">
        <FiltersCheckboxes
          name="categories"
          startedRows={5}
          options={terms.categories}
          selected={filtersSelected.categories}
          handleChange={(name: FilterName, selected: Option[]) => {
            handleChange({
              [name]: selected,
            })
          }}
        />
      </FiltersGroup>
      <FiltersGroup title="Umiejętności">
        <FiltersCheckboxes
          name="skills"
          startedRows={5}
          options={terms.skills}
          selected={filtersSelected.skills}
          handleChange={(name: FilterName, selected: Option[]) => {
            handleChange({
              [name]: selected,
            })
          }}
        />
      </FiltersGroup>
      <FiltersGroup title="Usługi">
        <FiltersCheckboxes
          name="services"
          startedRows={5}
          options={terms.services}
          selected={filtersSelected.services}
          handleChange={(name: FilterName, selected: Option[]) => {
            handleChange({
              [name]: selected,
            })
          }}
        />
      </FiltersGroup>
    </div>
  );
};
