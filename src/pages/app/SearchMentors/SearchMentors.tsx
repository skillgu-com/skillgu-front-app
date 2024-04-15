// Libraries
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
// Components
import AppHeader from "src/new-components/AppHeader/AppHeader";
import {
  FiltersHeader,
  FiltersPopup,
  MentorsList,
  FiltersSidebar,
} from "./sections";
import Container from "@newComponents/Container/Container";
// Types
import { SortOption } from "@customTypes/mentor";
import { Tag } from "src/types/tags";
// Variables
import {
  PAGE_SIZE,
  SEARCH_DELAY,
} from "./config";
// Utils
import { termsReducer } from "src/reducers/terms";
import { fetchTerms } from "src/services/TermsService";
import { termsInitialState } from "src/reducers/terms/constants";
import styles from "./SearchMentors.module.scss";
import { mentorsReducer } from "src/reducers/mentors";
import { mentorsInitialState } from "src/reducers/mentors/constants";
import { FilterName, FiltersSelected, Option } from "@customTypes/mentor";
import { fetchMentors } from "src/services/MentorsService";

const SearchMentors = () => {
  const [terms, dispatchTerms] = useReducer(termsReducer, termsInitialState);
  const [state, dispatchMentors] = useReducer(
    mentorsReducer,
    mentorsInitialState
  );
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const search = useCallback(
    async (page: number, filters: FiltersSelected) => {
      dispatchMentors({
        type: "UPDATE_REQUEST_STATE",
        payload: { error: "", pending: true, },
      })
      try {
        const { total, mentors } = await fetchMentors(page, PAGE_SIZE, filters);

        // @TODO: remove promise
        // await new Promise(resolve => setTimeout(resolve, 1000));
        dispatchMentors({
          type: "UPDATE_RESULTS",
          payload: { mentors, total },
        })
        dispatchMentors({
          type: "UPDATE_REQUEST_STATE",
          payload: { error: "", pending: false, },
        })
       } catch (e) {
        dispatchMentors({
          type: "UPDATE_REQUEST_STATE",
          payload: { error: "Wystąpił błąd podczas pobierania danych.", pending: false, },
        })
       }
    },
    []
  );

  const searchMore = useCallback(
    async (page: number, filters: FiltersSelected) => {
      try {
        const { mentors } = await fetchMentors(
          page,
          PAGE_SIZE,
          filters
        );
        dispatchMentors({
          type: "ADD_RESULTS",
          payload: { mentors },
        })
       } catch (e) {
        dispatchMentors({
          type: "UPDATE_REQUEST_STATE",
          payload: { error: "Wystąpił błąd podczas pobierania danych.", pending: false, },
        })
       }
    },
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMore(state.page, state.filters);
    }, SEARCH_DELAY);
    return () => clearTimeout(timeoutId);
  }, [searchMore, state.filters, state.page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(1, state.filters);
    }, SEARCH_DELAY);
    return () => clearTimeout(timeoutId);
  }, [search, state.filters]);

  useEffect(() => {
    const run = async () => {
      const terms = await fetchTerms();
      dispatchTerms({ type: "UPDATE_TERMS", payload: terms });
    };
    run();
  }, []);

  const handleChangeSortOption = useCallback((value: SortOption) => {
    dispatchMentors({
      type: "UPDATE_FILTERS",
      payload: { filters: { sort: value } },
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    dispatchMentors({
      type: "UPDATE_FILTERS",
      payload: { filters: mentorsInitialState.filters },
    });
  }, []);

  const handleRemovePrice = useCallback(() => {
    dispatchMentors({
      type: "UPDATE_FILTERS",
      payload: {
        filters: {
          priceMin: mentorsInitialState.filters.priceMin,
          priceMax: mentorsInitialState.filters.priceMax,
        },
      },
    });
  }, []);

  const handleRemoveFilter = useCallback(
    (name: FilterName, opt: Option) => {
      const collection = state.filters[name];
      let newCollection: null | Option[] = null;
      if (Array.isArray(collection)) {
        if (collection.includes(opt)) {
          newCollection = collection.filter((o) => o !== opt);
        } else {
          newCollection = [...collection, opt];
        }
      }
      const initial: Partial<FiltersSelected> = {
        [name]: newCollection || mentorsInitialState.filters[name],
      };
      if (name.includes("price")) {
        initial.priceMin = mentorsInitialState.filters.priceMin;
        initial.priceMax = mentorsInitialState.filters.priceMax;
      }
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: initial },
      });
    },
    [state.filters]
  );

  const onChangePhrase = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: { phrase: e.target.value } },
      });
    },
    []
  );

  const toggleFiltersSidebar = useCallback(() => setPopupOpen((s) => !s), []);

  // const handleLoadMore = () => {
  //   // @TODO: remove set timeout
  //   setTimeout(
  //     () =>
  //       dispatchMentors({
  //         type: "UPDATE_PAGE",
  //         payload: { page: state.page + 1 },
  //       }),
  //     1000
  //   );
  // };
    const handleLoadMore = () => {
        dispatchMentors({
            type: "UPDATE_PAGE",
            payload: { page: state.page + 1 },
        });
    };

  const handleChangeFilter = useCallback(
    (changed: Partial<FiltersSelected>) => {
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: changed },
      });
    },
    []
  );

  return (
    <>
      <AppHeader
        title="Znajdź mentora dla siebie"
        text="Przeglądaj profile mentorów i wybierz tego, który spełnia twoje oczekiwania."
      />
      <FiltersPopup
        terms={terms}
        filters={state.filters}
        isOpen={popupOpen}
        handleChange={handleChangeFilter}
        handleClose={toggleFiltersSidebar}
        handleSubmit={toggleFiltersSidebar}
      />
      <Container as={Tag.Header} classes={styles.header}>
        <div className={styles.grid}>
          <FiltersSidebar
            terms={terms}
            filters={state.filters}
            handleChange={handleChangeFilter}
          />
          <div className={styles.main}>
            <FiltersHeader
              error={state.error}
              displayed={state.mentors.length}
              pending={state.pending}
              filters={state.filters}
              total={state.total}
              handleChangeSortOption={handleChangeSortOption}
              handleClearFilters={handleClearFilters}
              handleRemoveFilter={handleRemoveFilter}
              handleRemovePrice={handleRemovePrice}
              onChangePhrase={onChangePhrase}
              toggleFiltersSidebar={toggleFiltersSidebar}
            />
            <MentorsList
              error={state.error}
              pending={state.pending}
              hasNextPage={state.total > state.mentors.length}
              mentors={state.mentors}
              handleLoadMore={handleLoadMore}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SearchMentors;
