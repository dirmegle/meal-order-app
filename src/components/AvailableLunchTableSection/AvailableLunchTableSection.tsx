import { useState } from 'react';
import { AvailableLunchUpdated } from '../../pages/availableLunchPageUtils';
import AvailableLunchTable from '../AvailableLunchTable/AvailableLunchTable';
import AvailableLunchCard from '../AvailableLunchCard/AvailableLunchCard';
import Pagination from '../Pagination/Pagination';
import { displayCardsWithPagination, rowsPerPageOptions } from './AvailableLunchTableSectionUtils';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import styles from './availableLunchTableSection.module.css';

interface AvailableLunchTableSectionProps {
  availableLunch: AvailableLunchUpdated[];
  setIsRefresh: () => void;
  onClick: (reservedLunch: AvailableLunchUpdated) => void;
}

function AvailableLunchTableSection({
  availableLunch,
  setIsRefresh,
  onClick,
}: AvailableLunchTableSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const displayedCards = displayCardsWithPagination(availableLunch, currentPage, rowsPerPage);

  return (
    <AvailableLunchTable onClick={setIsRefresh}>
      {displayedCards.map((lunch) => (
        <AvailableLunchCard key={lunch.id} availableLunch={lunch} onClick={() => onClick(lunch)} />
      ))}
      {displayedCards.length === 0 && <LoadingAnimation />}
      <div className={styles.pagination}>
        <Pagination
          totalRows={availableLunch.length}
          rowsPerPageOptions={rowsPerPageOptions}
          currentPage={currentPage}
          currentRowsPerPage={rowsPerPage}
          onClick={setCurrentPage}
          onChange={setRowsPerPage}
        />
      </div>
    </AvailableLunchTable>
  );
}

export default AvailableLunchTableSection;
