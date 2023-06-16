export const BASE_URL_API = 'https://service.ssm.devcontour.ru/api';
export const GOOGLEPLACEAUTO_API_KEY = 'AIzaSyC1X2rQbBmv1xLKw1_8Y2u4wGJ_nS4a9M';

export const postLegalData = async (data: any) => {
    const res = await fetch(`${BASE_URL_API}/egal-entities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await res.json();
};
