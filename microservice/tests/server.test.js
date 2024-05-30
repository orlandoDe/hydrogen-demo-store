const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');

describe('API Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test('should check if a product is favorited by a specific user', async () => {
    const favorite = new mongoose.models.Favorite({
      userId: '1111',
      productId: '1234',
      productTitle: 'Test Product',
      productImgUrl: 'http://example.com/image.jpg',
      productDescription: 'Test Description',
      url: 'http://example.com',
    });
    await favorite.save();

    const res = await request(app).get('/api/favorite/1111/1234');

    expect(res.status).toBe(200);
    expect(res.body.isFavorited).toBe(true);
  });

  test('should add a favorite', async () => {
    const res = await request(app)
      .post('/api/favorite')
      .send({
        userId: '1111',
        productId: '1234',
        productTitle: 'Test Product',
        productImgUrl: 'http://example.com/image.jpg',
        productDescription: 'Test Description',
        url: 'http://example.com',
      });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe('1111');

    const favorite = await mongoose.models.Favorite.findOne({ userId: '1111', productId: '1234' });
    expect(favorite).not.toBeNull();
  });

  test('should remove a favorite', async () => {
    const favorite = new mongoose.models.Favorite({
      userId: '1111',
      productId: '1234',
      productTitle: 'Test Product',
      productImgUrl: 'http://example.com/image.jpg',
      productDescription: 'Test Description',
      url: 'http://example.com',
    });
    await favorite.save();

    const res = await request(app)
      .delete('/api/favorite/1234')
      .send({ userId: '1111' });

    expect(res.status).toBe(204);

    const removedFavorite = await mongoose.models.Favorite.findOne({ userId: '1111', productId: '1234' });
    expect(removedFavorite).toBeNull();
  });

  test('should get all favorited products by userId', async () => {
    const favorite1 = new mongoose.models.Favorite({
      userId: '1111',
      productId: '1234',
      productTitle: 'Test Product 1',
      productImgUrl: 'http://example.com/image1.jpg',
      productDescription: 'Test Description 1',
      url: 'http://example.com/1',
    });
    const favorite2 = new mongoose.models.Favorite({
      userId: '1111',
      productId: '5678',
      productTitle: 'Test Product 2',
      productImgUrl: 'http://example.com/image2.jpg',
      productDescription: 'Test Description 2',
      url: 'http://example.com/2',
    });
    await favorite1.save();
    await favorite2.save();

    const res = await request(app).get('/api/favorites/1111');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test('should get global favorites', async () => {
    const globalFavorite = new mongoose.models.GlobalFavorite({
      productId: '1234',
      productTitle: 'Test Product',
      productImgUrl: 'http://example.com/image.jpg',
      productDescription: 'Test Description',
      count: 5,
      url: 'http://example.com',
    });
    await globalFavorite.save();

    const res = await request(app).get('/api/global-favorites');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].productId).toBe('1234');
  });

  test('should get current user for test', async () => {
    const res = await request(app).get('/api/current-user').query({ userId: '1234' });

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe('1234');
  });
});
