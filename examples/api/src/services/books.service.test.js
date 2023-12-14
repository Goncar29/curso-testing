/* eslint-disable indent */
/* eslint-disable linebreak-style */
const { generateManyBooks } = require('../fakes/book.fake');
const BooksService = require('./books.service');

const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
})));

describe('Test for BooksService', () => {
    let service;
    beforeEach(() => {
            service = new BooksService();
            jest.clearAllMocks();
    });

    describe('test for getBooks', () => {
        test('should return a list book', async () => {
            // Arrange
            const fakeBooks = generateManyBooks(20)
            mockGetAll.mockResolvedValue(fakeBooks);
            // Act
            const books = await service.getBooks({});
            console.log(books);
            // Assert
            expect(books.length).toEqual(fakeBooks.length);
            expect(mockGetAll).toHaveBeenCalled();
            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith('books', {});
        });

        test('should return a list book', async () => {
            const fakeBooks = generateManyBooks(4)
            mockGetAll.mockResolvedValue(fakeBooks);
            const books = await service.getBooks({});
            console.log(books);
            expect(books[0].name).toEqual(fakeBooks[0].name);
        });
    });
});