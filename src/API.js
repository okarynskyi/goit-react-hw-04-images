import axios from 'axios';

const API_KEY = '29400670-7ab87ece5bce46682a5958f07';

export const fetchImages = async (request, page) => {
  const result = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`);
  return result.data;
};