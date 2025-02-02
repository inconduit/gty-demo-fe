import { useEffect, useState } from 'react';

const IMAGE_LIST_API_ENDPOINT = 'http://picsum.photos/v2/list';

const fetchPhotos = async (page: number, limit = 10) => {
  return fetch(`${IMAGE_LIST_API_ENDPOINT}?page=${page}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => data);
};

interface PhotoGridProps {
  onClickPhoto?: (url: string) => void;
}

const PhotoGrid = ({ onClickPhoto }: PhotoGridProps) => {
  const [photos, setPhotos] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchPhotos(pageCount).then((photos) => {
      setPhotos((existingPhotos) => existingPhotos.concat(photos).flat());
    });
  }, [pageCount]);

  return photos.map(({ id, download_url }) => (
    <div key={id} onClick={() => onClickPhoto?.(download_url)}>
      {id} : {download_url}
    </div>
  ));
};

export default PhotoGrid;
