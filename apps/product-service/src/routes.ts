import express from 'express';

import { getAllProducts } from './service/products';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string, 0) || 0; // Default limit to 10 if not provided
    const skip = parseInt(req.query.skip as string, 0) || 0; // Default skip to 0 if not provided

    const result = await getAllProducts({ limit, skip });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
