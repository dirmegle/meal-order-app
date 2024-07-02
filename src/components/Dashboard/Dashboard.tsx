import { useEffect, useMemo, useState } from 'react';
import Button from '../Button/Button';
import Search from '../Search/Search';
import Select, { SelectData } from '../Select/Select';
import { MealsUpdated } from '../../hooks/useMealsUpdate';
import styles from './dashboard.module.css';

interface LabelPlaceholder {
  label: string;
  placeholder: string;
}

interface DashboardProps {
  searchText: LabelPlaceholder;
  selectText: LabelPlaceholder;
  searchAutocompleteData: string[];
  selectOptionsData: SelectData[];
  dataToFilter: MealsUpdated[];
  setFilteredData: (data: MealsUpdated[]) => void;
  children?: React.ReactNode;
  isRealTimeSearch?: boolean;
}

export default function Dashboard({
  searchText,
  selectText,
  searchAutocompleteData,
  selectOptionsData,
  dataToFilter,
  setFilteredData,
  children,
  isRealTimeSearch = false,
}: DashboardProps) {
  const [isReset, setIsReset] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<SelectData>(selectOptionsData[0]);

  const filteredDataBySearchSelect = useMemo(
    () =>
      dataToFilter?.filter((dataObj) => {
        const isSearchMatch = dataObj.title
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase());
        const isSelectMatch =
          selectValue?.id.toString() === '0' ||
          dataObj.vendorId.toString() === selectValue?.id.toString();

        if (searchValue && selectValue) {
          return isSearchMatch && isSelectMatch;
        }
        if (selectValue) {
          return isSelectMatch;
        }
        return isSearchMatch;
      }),
    [dataToFilter, searchValue, selectValue]
  );

  useEffect(() => {
    if (isRealTimeSearch && !isReset) {
      setFilteredData(filteredDataBySearchSelect);
    }
    if (isRealTimeSearch && isReset) {
      setIsReset(false);
      setSelectValue(selectOptionsData[0]);
    }
  }, [filteredDataBySearchSelect, isRealTimeSearch, setFilteredData, isReset, selectOptionsData]);

  const handleSearchClick = () => {
    setIsReset(false);
    setFilteredData(filteredDataBySearchSelect);
  };

  const handleReset = () => {
    setFilteredData(dataToFilter);
    setIsReset(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <Search
          autocompleteData={searchAutocompleteData}
          label={searchText.label}
          placeholder={searchText.placeholder}
          isLoading={!searchAutocompleteData}
          setData={setSearchValue}
          searchValue={searchValue}
          isReset={isReset}
        />
        <Select
          label={selectText.label}
          placeholder={selectText.placeholder}
          options={selectOptionsData}
          setData={setSelectValue}
          isReset={isReset}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        {children && (
          <Button type="submit" category="primary" size="medium" onClick={handleSearchClick}>
            Search
          </Button>
        )}
        <Button
          type="reset"
          category={children ? 'secondary' : 'primary'}
          size="medium"
          onClick={handleReset}>
          Reset
        </Button>
      </div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
}
