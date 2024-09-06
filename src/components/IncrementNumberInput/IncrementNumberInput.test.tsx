import React from 'react';
import IncrementNumberInput from './IncrementNumberInput';
import { fireEvent, userEvent, waitFor } from '@testing-library/react-native';
import { render } from '../../testutils/TestRender';
import { GetAllByQuery, GetByQuery } from '@testing-library/react-native/build/queries/make-queries';
import { ByRoleOptions, ByRoleMatcher } from '@testing-library/react-native/build/queries/role';
import { TextMatch, TextMatchOptions } from '@testing-library/react-native/build/matches';

describe('<IncrementNumberInput />', () => {
  test('renders correctly', () => {
    const tree = render(
      <IncrementNumberInput label="Enter..." delta={1} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('sets the input value', () => {
    const placeholder = "Enter..."
    const value = 25
    const { getByPlaceholderText } = render(
      <IncrementNumberInput label={placeholder} value={value} delta={1} />
    );

    const input = getByPlaceholderText(placeholder);
    expect(input.props["value"]).toEqual(value.toString());
  });

  test('triggers onChange', () => {
    const mockCallback = jest.fn(() => 5);
    const { getByText } = render(
      <IncrementNumberInput label="Enter..."
        value={0} delta={1} onChange={() => mockCallback()} />
    );

    const decreaseButton = getByText("-");
    fireEvent.press(decreaseButton);

    expect(mockCallback).toHaveBeenCalledTimes(1)
  });

  describe('button clicks', () => {
    const placeholderText = 'Enter...';
    let getByText: GetByQuery<TextMatch, TextMatchOptions>;
    let getByPlaceholderText: GetByQuery<TextMatch, TextMatchOptions>;
    beforeEach(() => {
      const value = 25;
      const result = render(
        <IncrementNumberInput label={placeholderText} value={value} delta={5} />
      );
      getByText = result.getByText;
      getByPlaceholderText = result.getByPlaceholderText
    });

    test('increments value', () => {
      const increaseButton = getByText("+")

      fireEvent.press(increaseButton);

      const input = getByPlaceholderText(placeholderText);
      expect(input.props["value"]).toEqual("30");
    });

    test('decrements value', () => {
      const decreaseButton = getByText("-")

      fireEvent.press(decreaseButton);

      const input = getByPlaceholderText(placeholderText);
      expect(input.props["value"]).toEqual("20");
    });

    test('does not allow negative values', () => {
      const decreaseButton = getByText("-")

      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);
      fireEvent.press(decreaseButton);

      const input = getByPlaceholderText(placeholderText);
      expect(input.props["value"]).toEqual("0");
    });
  });

  describe('floats', () => {
    const placeholderText = 'Enter...';

    test('allowed by default', async () => {
      const value = 25;
      const { getByPlaceholderText } = render(
        <IncrementNumberInput label={placeholderText} value={value} delta={5} />
      );

      const newValue = '3.27';
      userEvent.setup();
      const input = getByPlaceholderText(placeholderText);

      await userEvent.clear(input);
      await userEvent.type(input, newValue);

      await waitFor(() =>
        expect(input.props["value"]).toEqual(newValue)
      );
    });

    test('are converted on blur', async () => {
      const value = 25;
      const { getByPlaceholderText, getByText } = render(
        <IncrementNumberInput label={placeholderText} value={value} delta={5} disableFloats={true} />
      );
      const newValue = '3.27';
      userEvent.setup();
      const input = getByPlaceholderText(placeholderText);

      await userEvent.clear(input);
      await userEvent.type(input, newValue);
      const button = getByText("+");
      fireEvent.press(button)

      await waitFor(() =>
        expect(input.props["value"]).toEqual("8")
      );
    });
  });
});