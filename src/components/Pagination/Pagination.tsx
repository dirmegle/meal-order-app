import IconButton from '../IconButton/IconButton';
import Previous from '../../assets/icons/buttons/arrowLeftGrey.svg?react';
import Next from '../../assets/icons/buttons/arrowRightGrey.svg?react';
import useIsMobile from '../../hooks/useIsMobile';
import styles from './pagination.module.css';

interface PaginationProps {
  totalRows: number;
  rowsPerPageOptions: number[];
  currentPage: number;
  currentRowsPerPage: number;
  onClick: (newPage: number) => void;
  onChange: (newRowsPerPage: number) => void;
}

export default function Pagination({
  totalRows,
  rowsPerPageOptions,
  currentPage,
  currentRowsPerPage,
  onClick,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRows / currentRowsPerPage);
  const displayStart = (currentPage - 1) * currentRowsPerPage + 1;
  const displayEnd = Math.min(currentPage * currentRowsPerPage, totalRows);
  const { isMobile } = useIsMobile();

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="rowsPerPage">
          Rows per page:
          <select
            id="rowsPerPage"
            aria-label="select row number per page"
            className={styles.selectRowPerPage}
            value={currentRowsPerPage}
            onChange={(e) => onChange(+e.target.value)}>
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option} aria-label={`${option} rows per page`}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span>
        {displayStart}-{displayEnd} of {totalRows}
      </span>
      <div className={styles.buttons}>
        <IconButton
          ariaLabel="previous page"
          category="transparent"
          size={isMobile ? 'small' : 'medium'}
          onClick={() => onClick(currentPage - 1)}
          isDisabled={currentPage === 1}>
          <Previous />
        </IconButton>
        <IconButton
          ariaLabel="next page"
          category="transparent"
          size={isMobile ? 'small' : 'medium'}
          onClick={() => onClick(currentPage + 1)}
          isDisabled={currentPage === totalPages}>
          <Next />
        </IconButton>
      </div>
    </div>
  );
}
