import { render, screen } from '@testing-library/react';
import Legal from '../pages/Legal';

test('affiche la page des mentions legales', () => {
  render(<Legal />);
  expect(screen.getByText(/Mentions légales/i)).toBeInTheDocument();
});
