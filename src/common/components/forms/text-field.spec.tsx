import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TextField } from './text-field';
import { FieldInputProps } from 'react-final-form';

describe('Text field component specs', () => {
  it('should render an input with the given name and value', () => {
    // Arrange
    const props = {
      input: {
        name: 'input name',
        value: 'input value',
      } as FieldInputProps<any, any>,
      meta: '',
      'data-testid': 'textFieldTest',
    };

    // Act
    const { getByTestId } = render(<TextField {...props} />);

    // Assert
    const textFieldElement = getByTestId('textFieldTest') as HTMLInputElement;
    expect(textFieldElement).toBeInTheDocument();
    expect(textFieldElement.name).toEqual('input name');
    expect(textFieldElement.value).toEqual('input value');
  });

  it('should call onChange when it changes', async () => {
    // Arrange
    const props = {
      input: {
        name: 'input name',
        value: 'input value',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
      } as FieldInputProps<any, any>,
      meta: '',
      'data-testid': 'textFieldTest',
    };

    // Act
    const { getByTestId } = render(<TextField {...props} />);
    const textFieldElement = getByTestId('textFieldTest') as HTMLInputElement;

    fireEvent.change(textFieldElement, { target: { value: 'new value' } });

    // Assert
    expect(props.input.onChange).toHaveBeenCalled();
  });
});
