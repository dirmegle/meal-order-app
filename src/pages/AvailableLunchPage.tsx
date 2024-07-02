import { useContext, useEffect, useState } from 'react';
import TitleAndDescription from '../components/TitleAndDescription/TitleAndDescription';
import { MealsUpdated } from '../hooks/useMealsUpdate';
import handleReservation, {
  AvailableLunch,
  AvailableLunchUpdated,
  createAutocompleteData,
  createAvailableLunchTableData,
  createSelectOptions,
  fetchAndUpdateAvailableLunch,
} from './availableLunchPageUtils';
import ReservedMealCard from '../components/ReservedMealCard/ReservedMealCard';
import WarningToast from '../assets/icons/toast/errorOutline.svg?react';
import AvailableLunchTableSection from '../components/AvailableLunchTableSection/AvailableLunchTableSection';
import Dashboard from '../components/Dashboard/Dashboard';
import { searchText, selectText } from './foodMenuConfig';
import { ToastContext, ToastContextValue } from '../store/ToastContext';
import useUserData from '../hooks/useUserData';
import { CartContext } from '../store/CartContext';
import { CartContextValue } from '../store/cartContextConfig';
import styles from './pagesStyles.module.css';

export default function AvailableLunchPage() {
  const [availableLunchUpdated, setAvailableLunchUpdated] = useState<AvailableLunchUpdated[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<AvailableLunchUpdated | null>(null);
  const [reservedMeal, setReservedMeal] = useState<AvailableLunchUpdated | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [filteredMealSearchSelect, setFilteredMealSearchSelect] = useState<MealsUpdated[]>([]);
  const [dashboardData, setDashboardData] = useState<MealsUpdated[]>([]);
  const selectOptions = createSelectOptions(dashboardData);
  const searchAutocompleteData = createAutocompleteData(dashboardData);
  const availableLunchTableData = createAvailableLunchTableData(
    filteredMealSearchSelect,
    availableLunchUpdated
  );
  const { addToast, removeToast } = useContext(ToastContext) as ToastContextValue;
  const { mealsUpdated, userProfile } = useContext(CartContext) as CartContextValue;
  const { users } = useUserData();
  const reserveUserLunch = (availableLunch: AvailableLunch) => {
    const meals = availableLunchUpdated.find((meal) => meal.id === availableLunch.id);
    if (meals) {
      setSelectedMeal(meals);
    }
  };

  useEffect(() => {
    fetchAndUpdateAvailableLunch(
      users,
      mealsUpdated,
      setAvailableLunchUpdated,
      setFilteredMealSearchSelect,
      setDashboardData
    );
  }, [mealsUpdated, reservedMeal, isRefresh, users]);

  useEffect(() => {
    if (userProfile && selectedMeal) {
      handleReservation(
        users,
        userProfile,
        selectedMeal,
        () => setSelectedMeal(null),
        setErrorMsg,
        setReservedMeal
      );
      setSelectedMeal(null);
    }
  }, [userProfile, selectedMeal, users]);

  useEffect(() => {
    if (errorMsg) {
      const id = addToast({
        icon: <WarningToast />,
        children: errorMsg,
        toastType: 'warning',
        onClose: () => removeToast(id),
      });
      setErrorMsg('');
    }
  }, [errorMsg, addToast, setErrorMsg, removeToast]);

  return (
    <div className={styles.container}>
      <section>
        <TitleAndDescription
          title="Available Lunch"
          description="Friday dishes that are up for grabs, from your colleagues."
        />
      </section>
      {reservedMeal ? (
        userProfile && (
          <section className={styles.cardContainer}>
            <ReservedMealCard
              userId={userProfile.id}
              reservedMeals={reservedMeal}
              setErrMsg={setErrorMsg}
              setReservedMeal={() => setReservedMeal(null)}
            />
          </section>
        )
      ) : (
        <section className={styles.section}>
          <Dashboard
            setFilteredData={setFilteredMealSearchSelect}
            dataToFilter={dashboardData}
            searchText={searchText}
            selectText={selectText}
            selectOptionsData={selectOptions}
            searchAutocompleteData={searchAutocompleteData}
            isRealTimeSearch
          />
          <AvailableLunchTableSection
            availableLunch={availableLunchTableData}
            setIsRefresh={() => setIsRefresh(!isRefresh)}
            onClick={reserveUserLunch}
          />
        </section>
      )}
    </div>
  );
}
