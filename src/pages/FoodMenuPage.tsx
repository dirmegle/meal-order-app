import { useContext, useEffect, useMemo, useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import getFormatedDateRange, { WORKDAYS, previousDays, currentWorkday } from '../utils/dates';
import TitleAndDescription from '../components/TitleAndDescription/TitleAndDescription';
import useIsMobile from '../hooks/useIsMobile';
import Dashboard from '../components/Dashboard/Dashboard';
import SortingMenu, { SortingMenuData } from '../components/SortingMenu/SortingMenu';
import { MealsUpdated } from '../hooks/useMealsUpdate';
import { SortBy, createTabsPropData, sortMeals } from './foodMenuPageUtils';
import { searchText, selectText, sortingOptions } from './foodMenuConfig';
import FoodMenuCardsList from '../components/FoodMenuCardsList/FoodMenuCardsList';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import useMealsData from '../hooks/useMealsData';
import { createSelectOptions } from './availableLunchPageUtils';
import { CartContext } from '../store/CartContext';
import { CartContextValue } from '../store/cartContextConfig';
import styles from './pagesStyles.module.css';

export default function FoodMenuPage() {
  const { isMobile } = useIsMobile();
  const { isMealsLoadingScreenVisible } = useMealsData();
  const { dateStartsWithMonth } = getFormatedDateRange();
  const workingDaysForTabs = createTabsPropData(WORKDAYS, isMobile, previousDays);
  const [selectedTab, setSelectedTab] = useState(currentWorkday || workingDaysForTabs[0].label);
  const [sortIndicator, setSortIndicator] = useState<SortingMenuData>({
    label: '',
    sortingKey: '',
  });
  const [isSortDescending, setIsSortDescending] = useState(false);
  const [filteredMealSearchSelect, setFilteredMealSearchSelect] = useState<MealsUpdated[]>([]);
  const { mealsUpdated } = useContext(CartContext) as CartContextValue;
  const selectOptions = createSelectOptions(
    Object.values(mealsUpdated).flatMap((dayMeals) => dayMeals)
  );

  const filteredMealByDay = useMemo(() => mealsUpdated[selectedTab], [mealsUpdated, selectedTab]);
  const searchAutocompleteData = filteredMealByDay?.map((meal) => meal.title);

  useEffect(() => {
    setFilteredMealSearchSelect(filteredMealByDay);
  }, [filteredMealByDay]);

  const sortedMeals = sortMeals(
    filteredMealSearchSelect,
    sortIndicator.sortingKey as SortBy,
    isSortDescending
  );

  return (
    <div className={styles.container}>
      <section>
        <TitleAndDescription
          title="Lunch Menu"
          description={`Lunch menu for the week of ${dateStartsWithMonth}`}
        />
      </section>
      <section>
        <Tabs
          isUppercase={false}
          tabsData={workingDaysForTabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}>
          <Dashboard
            setFilteredData={setFilteredMealSearchSelect}
            dataToFilter={filteredMealByDay}
            searchText={searchText}
            selectText={selectText}
            selectOptionsData={selectOptions}
            searchAutocompleteData={searchAutocompleteData}>
            <SortingMenu
              sortOptions={sortingOptions}
              isSortDescending={isSortDescending}
              setIsSortDescending={setIsSortDescending}
              selectedOption={sortIndicator}
              setData={setSortIndicator}
            />
          </Dashboard>
          {isMealsLoadingScreenVisible ? (
            <LoadingAnimation />
          ) : (
            <FoodMenuCardsList meals={sortedMeals} selectedTab={selectedTab} />
          )}
        </Tabs>
      </section>
    </div>
  );
}
