import ProductModel from '../db/products';

export const getAllProducts = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const total = await ProductModel.countDocuments();

  if (isNaN(Number(skip)) || skip < 0) {
    throw new Error('Invalid amount to skip');
  }

  if (isNaN(Number(limit)) || limit < 0) {
    throw new Error('Invalid limit');
  }

  const products = await ProductModel.find(null, null, { skip, limit }).exec();

  return {
    products,
    total,
    skip,
    limit,
  };
};
