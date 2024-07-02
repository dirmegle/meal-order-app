import { AvailableLunchUpdated } from '../../pages/availableLunchPageUtils';

export const rowsPerPageOptions = [5, 10, 20];

export const displayCardsWithPagination = (
  availableLunchUpdated: AvailableLunchUpdated[],
  currentPage: number,
  rowsPerPage: number
) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedAvailableLunchCards = availableLunchUpdated.slice(startIndex, endIndex);

  return displayedAvailableLunchCards;
};
