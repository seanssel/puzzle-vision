import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders app name', () => {
  render(<App />);
  let nameElement = screen.getByText(/puzzle/i);
  expect(nameElement).toBeInTheDocument();

  nameElement = screen.getByText(/VISION/i);
  expect(nameElement).toBeInTheDocument();
});
