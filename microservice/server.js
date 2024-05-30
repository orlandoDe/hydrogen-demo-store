const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using environment variable
if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Define the Favorite model
const favoriteSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  productTitle: String,
  productImgUrl: String,
  productDescription: String,
  url: String,
});
const Favorite = mongoose.model('Favorite', favoriteSchema);

// Define the GlobalFavorite model
const globalFavoriteSchema = new mongoose.Schema({
  productId: String,
  productTitle: String,
  productImgUrl: String,
  productDescription: String,
  count: Number,
  url: String,
});
const GlobalFavorite = mongoose.model('GlobalFavorite', globalFavoriteSchema);

// API endpoints

// Check if a product is favorited by a specific user
app.get('/api/favorite/:userId/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const favorite = await Favorite.findOne({ userId, productId });
    res.json({ isFavorited: !!favorite });
  } catch (error) {
    next(error);
  }
});

// Add a favorite
app.post('/api/favorite', async (req, res, next) => {
  try {
    const { userId, productId, productTitle, productImgUrl, productDescription, url } = req.body;
    const favorite = new Favorite({ userId, productId, productTitle, productImgUrl, productDescription, url });
    await favorite.save();

    // Update global favorites
    const globalFavorite = await GlobalFavorite.findOne({ productId });
    if (globalFavorite) {
      globalFavorite.count += 1;
      await globalFavorite.save();
    } else {
      const newGlobalFavorite = new GlobalFavorite({ productId, productTitle, productImgUrl, productDescription, url, count: 1 });
      await newGlobalFavorite.save();
    }

    res.status(201).send(favorite);
  } catch (error) {
    next(error);
  }
});

// Remove a favorite
app.delete('/api/favorite/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;

    // Find the favorite
    const favorite = await Favorite.findOne({ productId, userId });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await Favorite.deleteOne({ productId, userId });

    // Update global favorites
    const globalFavorite = await GlobalFavorite.findOne({ productId });
    if (globalFavorite) {
      globalFavorite.count -= 1;
      if (globalFavorite.count === 0) {
        await GlobalFavorite.deleteOne({ productId });
      } else {
        await globalFavorite.save();
      }
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get all favorited products by userId
app.get('/api/favorites/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    next(error);
  }
});

// Delete all favorited products
app.delete('/api/favorites', async (req, res, next) => {
  try {
    console.log('Delete all favorites request received');
    await Favorite.deleteMany({});
    await GlobalFavorite.deleteMany({});
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get global favorites
app.get('/api/global-favorites', async (req, res, next) => {
  try {
    const globalFavorites = await GlobalFavorite.find({});
    res.json(globalFavorites);
  } catch (error) {
    next(error);
  }
});

// Get current user for test only
let currentUser = "1111"; // Default value
app.get('/api/current-user', async (req, res, next) => {
  try {
    const userId = req.query.userId || currentUser;
    currentUser = userId; // Update currentUser
    res.json({ userId });
  } catch (error) {
    next(error);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

// Start the server only if this file is being run directly
if (require.main === module) {
  const port = 8085;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export the app for testing
module.exports = app;
