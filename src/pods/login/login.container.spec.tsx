import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HotelCollectionScene } from 'scenes';
import { LoginContainer } from './login.container';
import * as loginApi from './login.api';
import * as hotelsApi from '../hotel-collection/hotel-collection.api';

const renderWithRouter = (component) => {
  return {
    ...render(
      <HashRouter>
        <Switch>
          <Route path="/hotel-collection" component={HotelCollectionScene} />
        </Switch>
        {component}
      </HashRouter>
    ),
  };
};

describe('Login container specs', () => {
  it('it should alert an error when the credentials are invalid and not navigate to hotels collection', async () => {
    // Arrange
    const validateStub = jest
      .spyOn(loginApi, 'validateCredentials')
      .mockResolvedValue(false);

    const getHotelsSpy = jest.fn();
    window.alert = jest.fn();

    // Act
    const { getByTestId, queryByTestId } = renderWithRouter(<LoginContainer />);

    const nameElement = getByTestId('name');
    const passwordElement = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    await waitFor(() => {
      fireEvent.change(nameElement, { target: { value: 'name' } });
      fireEvent.change(passwordElement, { target: { value: 'password' } });
      fireEvent.click(loginButton);
    });

    // // Assert
    expect(validateStub).toHaveBeenCalledWith('name', 'password');
    expect(getHotelsSpy).not.toHaveBeenCalled();
    expect(queryByTestId('hotelCollection')).not.toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith(
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
  });

  it('it should navigate to hotels collection when credentials are valid', async () => {
    // Arrange
    window.alert = jest.fn();
    const validateStub = jest
      .spyOn(loginApi, 'validateCredentials')
      .mockResolvedValue(true);

    const hotels: hotelsApi.HotelEntityApi[] = [
      {
        id: '0248058a-27e4-11e6-ace6-a9876eff01b3',
        type: 'hotel',
        name: 'Motif Seattle',
        created: new Date(1464777092568),
        modified: new Date(1464777618676),
        address1: '1415 5th Ave',
        airportCode: 'SEA',
        amenityMask: 7798786,
        city: 'Seattle',
        confidenceRating: 52,
        countryCode: 'US',
        deepLink:
          'http://www.travelnow.com/templates/55505/hotels/125727/overview?lang=en&amp;currency=USD&amp;standardCheckin=null/null/null&amp;standardCheckout=null/null/null',
        highRate: 289,
        hotelId: 1257278,
        hotelInDestination: true,
        hotelRating: 4,
        location: {
          latitude: 47.60985,
          longitude: -122.33475,
        },
        locationDescription: 'Near Pike Place Market',
        lowRate: 259,
        metadata: {
          path: '/hotels/0248058a-27e4-11e6-ace6-a9876eff01b3',
        },
        postalCode: 98101,
        propertyCategory: 1,
        proximityDistance: 11.168453,
        proximityUnit: 'MI',
        rateCurrencyCode: 'USD',
        shortDescription:
          'With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within',
        stateProvinceCode: 'WA',
        thumbNailUrl: '/thumbnails/50947_264_t.jpg',
        tripAdvisorRating: 3.5,
        tripAdvisorRatingUrl:
          'http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.5-12345-4.gif',
      },
    ];

    const getHotelsStub = jest
      .spyOn(hotelsApi, 'getHotelCollection')
      .mockResolvedValue(hotels);

    // Act
    const { getByTestId, queryByTestId } = renderWithRouter(<LoginContainer />);

    const nameElement = getByTestId('name');
    const passwordElement = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    await waitFor(() => {
      fireEvent.change(nameElement, { target: { value: 'name' } });
      fireEvent.change(passwordElement, { target: { value: 'password' } });
      fireEvent.click(loginButton);
    });

    // // Assert
    expect(validateStub).toHaveBeenCalledWith('name', 'password');
    expect(getHotelsStub).toHaveBeenCalled();
    expect(queryByTestId('hotelCollection')).toBeInTheDocument();
    expect(window.alert).not.toHaveBeenCalled();
  });
});
