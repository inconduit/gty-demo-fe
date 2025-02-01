import { useEffect, useState } from 'react';

// TODO extract to env vars
const IMAGE_TEXT_API_HOST = 'http://localhost:3000';
const IMAGE_TEXT_ENDPOINT_URL = `${IMAGE_TEXT_API_HOST}/image-text`;

interface ImageTextLoaderProps {
  imageUrl: string;
  text: string;
}

const ImageTextLoader = ({ imageUrl, text }: ImageTextLoaderProps) => {
  const [imgSrc, setImgSrc] = useState<string>(null);

  useEffect(() => {
    fetch(IMAGE_TEXT_ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, text }),
    })
      .then((response) => response.json())
      .then((data) => setImgSrc(`${IMAGE_TEXT_API_HOST}/${data.imageUrl}`))
      .catch((error) => console.error(error));
  }, [imageUrl, text]);

  return imgSrc ? <img src={imgSrc} style={{ width: '100%' }} /> : null;
};

export default ImageTextLoader;
