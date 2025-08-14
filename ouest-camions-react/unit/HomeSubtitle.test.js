import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders La location de qualité link', () => {
  render(<App />);
  const linkElement = screen.getByText('La location de qualité');
  expect(linkElement).toBeInTheDocument();
});
 