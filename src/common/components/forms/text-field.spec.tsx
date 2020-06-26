import * as React from 'react';
import { render } from '@testing-library/react';
import { TextField } from './text-field';
import { FieldInputProps } from 'react-final-form';

describe('Text field component specs', () => {
  it('should render an input', () => {
    // Arrange
    const inputProps = {
      input: {
        name: 'text',
        value: 'some value',
      } as FieldInputProps<any, any>,
      meta: '',

      'data-testid': 'inputTest',
    };

    // Act
    const { getByTestId } = render(<TextField {...inputProps} />);

    // Assert
    const textFieldElement = getByTestId('inputTest');
    expect(textFieldElement).toBeInTheDocument();
  });
});
