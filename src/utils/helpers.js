export const getImageUrl = (imageSource) => {
    if (!imageSource) return '';
    if (typeof imageSource === 'string') return imageSource;
    if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
    return '';
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
