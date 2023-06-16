// import api from './BaseApi';

// interface categoryType {
//     name: string;
//     parent?: number;
//     photo?: number;
//     id?: number;
// }

// export const createCategoryApi = (category: categoryType) => {
//     return api.post('/api/categories?populate=*', {
//         data: {
//             name: category.name,
//             parent: category.parent,
//             photo: category.photo,
//         },
//     });
// };

// export const getCategoriesApi = (data: any) => {
//     return api.get('/api/categories', {
//         params: {
//             populate: '*',
//             ...data,
//         },
//     });
// };

// export const getCategorySingleApi = (id: number) => {
//     return api.get(`/api/categories/${id}?populate=*`);
// };

// export const editCategoryApi = (category: categoryType) => {
//     return api.put(`/api/categories/${category.id}?populate=*`, {
//         data: {
//             ...category,
//         },
//     });
// };

// export const deleteCategoryApi = (id: number) => {
//     return api.delete(`/api/categories/${id}`);
// };
