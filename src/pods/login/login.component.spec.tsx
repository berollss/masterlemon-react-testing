import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginComponent } from './login.component';

describe('Login component specs', () => {
  it('should render a card containing a Form with two fields and a button', () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: '',
        password: '',
      },
    };

    // Act
    const { getByTestId, getAllByTestId, getByText } = render(
      <LoginComponent {...props} />
    );

    // Assert
    expect(getByTestId('loginCard')).toBeInTheDocument();
    expect(getByTestId('loginForm')).toBeInTheDocument();
    expect(getAllByTestId('textFieldMui')).toHaveLength(2);
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByTestId('loginButton')).toBeInTheDocument();
  });

  it('should call onLogin when submit form', async () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: 'Admin',
        password: 'test',
      },
    };

    // Act
    const { getByTestId } = render(<LoginComponent {...props} />);

    const loginButton = getByTestId('loginButton') as HTMLButtonElement;

    await waitFor(() => {
      fireEvent.click(loginButton);
    });

    // Assert
    expect(props.onLogin).toHaveBeenCalled();
  });

  it('should update the name field when it changes', () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: '',
        password: '',
      },
    };

    // Act
    const { getByTestId } = render(<LoginComponent {...props} />);
    const nameFieldComponent = getByTestId('name') as HTMLInputElement;
    fireEvent.change(nameFieldComponent, { target: { value: 'Admin' } });

    // Assert
    expect(nameFieldComponent.value).toEqual('Admin');
  });

  it('should update the password field when it changes', () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: '',
        password: '',
      },
    };

    // Act
    const { getByTestId } = render(<LoginComponent {...props} />);
    const passwordFieldComponent = getByTestId('password') as HTMLInputElement;
    fireEvent.change(passwordFieldComponent, { target: { value: 'password' } });

    // Assert
    expect(passwordFieldComponent.value).toEqual('password');
  });

  it('should display error message when name field is empty', async () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: '',
        password: 'password',
      },
    };

    // Act
    const { getByTestId, getByText, queryByText } = render(
      <LoginComponent {...props} />
    );
    const nameFieldComponent = getByTestId('name') as HTMLInputElement;

    expect(
      queryByText('Please fill in this mandatory field.')
    ).not.toBeInTheDocument();

    await waitFor(() => {
      fireEvent.blur(nameFieldComponent);
    });

    // Assert
    expect(
      getByText('Please fill in this mandatory field.')
    ).toBeInTheDocument();
  });

  it('should display error message when password field is empty', async () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: 'login',
        password: '',
      },
    };

    // Act
    const { getByTestId, getByText, queryByText } = render(
      <LoginComponent {...props} />
    );
    const passwordFieldComponent = getByTestId('password') as HTMLInputElement;

    expect(
      queryByText('Please fill in this mandatory field.')
    ).not.toBeInTheDocument();

    await waitFor(() => {
      fireEvent.blur(passwordFieldComponent);
    });

    // Assert
    expect(
      getByText('Please fill in this mandatory field.')
    ).toBeInTheDocument();
  });
});
