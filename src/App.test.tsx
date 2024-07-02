import { render, screen } from '@testing-library/react';
import App from './App';

describe('App test', () => {
  it('should have correct text', () => {
    render(<App />);
    expect(screen.getByText(/Navigation/i)).toHaveTextContent('Navigation');
  });
});
