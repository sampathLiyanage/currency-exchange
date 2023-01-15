import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '../Results';

test('loads and displays greeting', async () => {
  render(
    <Results
      results={{
        from: 'EUR',
        to: 'USD',
        amount: 1000,
        rate: 1.1,
        oppositeRate: 0.9,
        value: 1100,
      }}
    />,
  );

  expect(screen.getByTestId('result_from')).toHaveTextContent('1000 EUR =');
  expect(screen.getByTestId('result_to')).toHaveTextContent('1100 USD');
  expect(screen.getByTestId('rate_from')).toHaveTextContent('1 EUR = 1.1 USD');
  expect(screen.getByTestId('rate_to')).toHaveTextContent('1 USD = 0.9 EUR');
});
