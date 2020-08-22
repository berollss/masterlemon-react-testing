import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { HotelCard } from './hotel-card.component';

describe('Hotel card component specs', () => {
  it('should render a card with hotel information', () => {
    // Arrange
    const props = {
      hotel: {
        id: 'hotelId',
        picture: 'pictureUrl',
        name: 'hotelName',
        description: 'hotelDescription',
        rating: 7,
        address: 'hotelAddress',
      },
    };

    // Act
    const { getByText, getByTestId, container } = render(
      <HotelCard {...props} />
    );

    // Assert
    const avatar = getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent(props.hotel.rating.toString());

    const cardHeader = getByTestId('cardHeader');
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader).toHaveTextContent(props.hotel.name);
    expect(cardHeader).toHaveTextContent(props.hotel.address);

    const cardContent = getByTestId('cardContent');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveTextContent(props.hotel.description);

    const cardMedia = getByTestId('cardMedia');
    expect(cardMedia).toBeInTheDocument();
    expect(cardMedia).toHaveProperty('title', props.hotel.name);
    expect(cardMedia).toHaveStyle(
      `background-image: url(${props.hotel.picture})`
    );
  });
});
