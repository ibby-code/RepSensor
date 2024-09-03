import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Exercise from './Home';

describe('<Exercise />', () => {
  test('it should mount', () => {
    render(<Exercise />);

    const Exercise = screen.getByTestId('Home');

    expect(Exercise).toBeInTheDocument();
  });
});