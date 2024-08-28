import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovementGraphics from './MovementGraphics';

describe('<MovementGraphics />', () => {
  test('it should mount', () => {
    render(<MovementGraphics />);

    const MovementGraphics = screen.getByTestId('MovementGraphics');

    expect(MovementGraphics).toBeInTheDocument();
  });
});