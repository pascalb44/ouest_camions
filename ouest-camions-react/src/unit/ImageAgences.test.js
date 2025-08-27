import { render, screen } from '@testing-library/react';
import ImageAgences from '../components/ImageAgences';

test('affiche une image avec alt "Nos agences"', () => {
  render(<ImageAgences />);
  const image = screen.getByAltText(/Nos agences/i);
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', './images/companycart.jpg');
});
