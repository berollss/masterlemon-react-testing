import * as React from 'react';
import { HotelCollectionComponent } from './hotel-collection.component';
import { render } from '@testing-library/react';

describe('Hotel collection component specs', () => {
  it('should render a list of zero hotels when no hotels in the hotel collection', () => {
    // Arrange
    const props = {
      hotelCollection: [],
    };

    // Act
    const { queryAllByTestId } = render(
      <HotelCollectionComponent {...props} />
    );

    // Assert
    const hotels = queryAllByTestId('hotel');
    expect(hotels).toHaveLength(0);
  });

  it('should render a list of one hotel when there is one hotel in the hotel collection', () => {
    // Arrange
    const props = {
      hotelCollection: [
        {
          id: 'hotel',
          picture: 'hotelUrl',
          name: 'hotelName',
          description: 'hotelDescription',
          rating: 2,
          address: 'hotelAddress',
        },
      ],
    };

    // Act
    const { getAllByTestId } = render(<HotelCollectionComponent {...props} />);

    // Assert
    const hotels = getAllByTestId('hotel');
    expect(hotels.length).toEqual(1);
    expect(hotels[0]).toHaveTextContent(props.hotelCollection[0].name);
  });

  it('should render a list of five hotels when there is five hotels in the hotel collection', () => {
    // Arrange
    const props = {
      hotelCollection: [
        {
          id: 'hotel1',
          picture: 'hotelUrl1',
          name: 'hotelName1',
          description: 'hotelDescription1',
          rating: 2,
          address: 'hotelAddress1',
        },
        {
          id: 'hotel2',
          picture: 'hotelUrl2',
          name: 'hotelName2',
          description: 'hotelDescription2',
          rating: 8,
          address: 'hotelAddress2',
        },
        {
          id: 'hotel3',
          picture: 'hotelUrl3',
          name: 'hotelName3',
          description: 'hotelDescription3',
          rating: 5,
          address: 'hotelAddress3',
        },
        {
          id: 'hotel4',
          picture: 'hotelUrl4',
          name: 'hotelName4',
          description: 'hotelDescription4',
          rating: 6,
          address: 'hotelAddress4',
        },
        {
          id: 'hotel5',
          picture: 'hotelUrl5',
          name: 'hotelName5',
          description: 'hotelDescription5',
          rating: 3,
          address: 'hotelAddress5',
        },
      ],
    };

    // Act
    const { getAllByTestId } = render(<HotelCollectionComponent {...props} />);

    // Assert
    const hotels = getAllByTestId('hotel');
    expect(hotels.length).toEqual(5);
    expect(hotels[0]).toHaveTextContent(props.hotelCollection[0].name);
    expect(hotels[1]).toHaveTextContent(props.hotelCollection[1].name);
    expect(hotels[2]).toHaveTextContent(props.hotelCollection[2].name);
    expect(hotels[3]).toHaveTextContent(props.hotelCollection[3].name);
    expect(hotels[4]).toHaveTextContent(props.hotelCollection[4].name);
  });
});
