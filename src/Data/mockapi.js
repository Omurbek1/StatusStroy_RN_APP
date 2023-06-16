import {products} from './db.json';

export const getProducts = product => {
  let name;
  products.map(data => {
    if (data.name === product) {
      name = data.name;
    }
  });
  return name;
};
