import * as React from 'react';
import { HotelCollectionContainer } from './hotel-collection.container';
import { render } from '@testing-library/react';
import * as hotelCollectionHook from './hotel-collection.hook';

describe('Hotel collection container specs', () => {
  it('should call loadHotelCollection when it renders the component', () => {
    // Arrange
    const hotelCollection = [
      {
        id: 'hotel',
        picture: 'hotelPictureUrl',
        name: 'hotelName',
        description: 'hotelDescription',
        rating: 9,
        address: 'hotelAddress',
      },
    ];
    const loadHotelCollectionSpy = jest.fn();
    jest.spyOn(hotelCollectionHook, 'useHotelCollection').mockReturnValue({
      hotelCollection,
      loadHotelCollection: loadHotelCollectionSpy,
    });

    // Act
    const { getByTestId } = render(<HotelCollectionContainer />);

    // Assert
    const hotelCollectionComponent = getByTestId('hotelCollection');
    expect(hotelCollectionComponent).toBeInTheDocument();
    expect(loadHotelCollectionSpy).toHaveBeenCalled();
  });
});
