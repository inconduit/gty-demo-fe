import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './Spinner.tsx';

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
  const [isLoading, setIsLoading] = useState(false);
  const [bottomDivRef, isScrolledToBottom] = useInView();

  useEffect(() => {
    setIsLoading(true);
    fetchPhotos(pageCount)
      .then((photos) => {
        setIsLoading(false);
        setPhotos((existingPhotos) => existingPhotos.concat(photos).flat());
      })
      .finally(() => setIsLoading(false));
  }, [pageCount]);

  useEffect(() => {
    if (isScrolledToBottom && !isLoading) {
      setPageCount((pageCount) => pageCount + 1);
    }
  }, [isLoading, isScrolledToBottom]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 place-items-center w-full">
        {photos.map(({ id, download_url }) => (
          <div className="border border-black w-full aspect-[3/2]">
            <img
              key={id}
              className="hover:opacity-75 cursor-pointer w-full object-cover aspect-[3/2]"
              onClick={() => onClickPhoto?.(download_url)}
              src={download_url}
            />
          </div>
        ))}
        <div ref={bottomDivRef} />
      </div>
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
