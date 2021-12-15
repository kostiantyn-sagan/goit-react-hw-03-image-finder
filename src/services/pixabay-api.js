const API_KEY = '19475707-408c9466706baaa6817e821a9';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(searchTerm, page = 1) {
  const searchParams = new URLSearchParams({
    q: searchTerm,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`There are no images for the search query ${searchTerm}`),
    );
  });
}

const api = {
  fetchImages,
};

export default api;
