import Category from '../models/Category.js';
import initialCategories from './data/initial-category.json' with { type: 'json' };
export const createInitialCategories = async () => {
    try {
        await Category.create(initialCategories);
    } catch (error) {
  }
};
