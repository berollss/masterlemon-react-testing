import { mapToCollection } from '.';

describe('collection mapper specs', () => {
  it('should return an empty array when collection is undefined', () => {
    // Arrange
    const collection: number[] = undefined;
    const mapFunction = jest.fn();
    // Act
    const result: number[] = mapToCollection(collection, mapFunction);

    // Assert
    expect(result).toStrictEqual([]);
    expect(mapFunction).toHaveBeenCalledTimes(0);
  });

  it('should return an empty array when collection is null', () => {
    // Arrange
    const collection: number[] = null;
    const mapFunction = jest.fn();
    // Act
    const result: number[] = mapToCollection(collection, mapFunction);

    // Assert
    expect(result).toStrictEqual([]);
    expect(mapFunction).toHaveBeenCalledTimes(0);
  });

  it('should return an empty array when collection is an empty array', () => {
    // Arrange
    const collection: number[] = undefined;
    const mapFunction = (a: number) => a + 1;
    
    // Act
    const result: number[] = mapToCollection(collection, mapFunction);

    // Assert
    expect(result).toStrictEqual([]);
  });

  it('should return a mapped array using the given function', () => {
    // Arrange
    const collection: number[] = [1, 2, 3, 4];
    const mapFunction = (a: number) => a + 1;

    // Act
    const result: number[] = mapToCollection(collection, mapFunction);

    // Assert
    const expectedResult: number[] = [2, 3, 4, 5];
    expect(result).toStrictEqual(expectedResult);
  });
});
