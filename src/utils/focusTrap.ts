export default function focusTrap(itemRef: HTMLElement) {
  const focusableElements = itemRef.querySelectorAll('button') as NodeListOf<HTMLElement>;
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  itemRef.addEventListener('keydown', handleTabKeyPress);
}
