import api from "../../api/api";


/*
|--------------------------------------------------------------------------
| Banners
|--------------------------------------------------------------------------
*/

export const getBanners = async () => {
    const response = await api.get(
        "/cms/banners/"
    );

    return response.data;
};


export const createBanner = async (
    data
) => {
    const response = await api.post(
        "/cms/banners/",
        data
    );

    return response.data;
};


export const updateBanner = async (
    bannerId,
    data
) => {
    const response = await api.put(
        `/cms/banners/${bannerId}/`,
        data
    );

    return response.data;
};


export const deleteBanner = async (
    bannerId
) => {
    const response = await api.delete(
        `/cms/banners/${bannerId}/`
    );

    return response.data;
};



/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

export const getPages = async () => {
    const response = await api.get(
        "/cms/pages/"
    );

    return response.data;
};


export const createPage = async (
    data
) => {
    const response = await api.post(
        "/cms/pages/",
        data
    );

    return response.data;
};


export const getPage = async (
    slug
) => {
    const response = await api.get(
        `/cms/pages/${slug}/`
    );

    return response.data;
};



/*
|--------------------------------------------------------------------------
| Site Settings
|--------------------------------------------------------------------------
*/

export const getSiteSettings = async () => {
    const response = await api.get(
        "/cms/settings/"
    );

    return response.data;
};


export const updateSiteSettings = async (
    data
) => {
    const response = await api.put(
        "/cms/settings/",
        data
    );

    return response.data;
};



/*
|--------------------------------------------------------------------------
| FAQ
|--------------------------------------------------------------------------
*/

export const getFAQs = async () => {
    const response = await api.get(
        "/cms/faqs/"
    );

    return response.data;
};


export const createFAQ = async (
    data
) => {
    const response = await api.post(
        "/cms/faqs/",
        data
    );

    return response.data;
};



/*
|--------------------------------------------------------------------------
| Newsletter
|--------------------------------------------------------------------------
*/

export const subscribeNewsletter = async (
    data
) => {
    const response = await api.post(
        "/cms/newsletter/subscribe/",
        data
    );

    return response.data;
};