import { useEffect, useRef, useState } from 'react';
import CloseIcon from './icons/CloseIcon.tsx';

interface ImageTextBuilderProps {
  imageUrl: string;
}

// TODO extract to env vars
const IMAGE_TEXT_API_HOST = 'http://localhost:3000';
const IMAGE_TEXT_ENDPOINT_URL = `${IMAGE_TEXT_API_HOST}/image-text`;

const ImageTextBuilder = ({ imageUrl }: ImageTextBuilderProps) => {
  const [text, setText] = useState<null | string>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string>(imageUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickGenerate = () => {
    if (!text) {
      return;
    }
    setIsGenerated(false);
    setIsGenerating(true);
    fetch(IMAGE_TEXT_ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGeneratedImgUrl(`${IMAGE_TEXT_API_HOST}/${data.imageUrl}`);
        setIsGenerated(true);
        setText('');
      })
      .catch((error) => console.error(error))
      .finally(() => setIsGenerating(false));
  };

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <div className="text-center">
      <input
        className="appearance-none border text-center rounded-sm w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-gray-50 focus:rounded-sm bg-white"
        placeholder="Enter text here"
        onChange={(e) => setText(e.target.value)}
        onFocus={(e) => e.target.select()}
        value={text || ''}
        ref={inputRef}
      />
      <button
        type="button"
        onClick={() => onClickGenerate()}
        disabled={isGenerating || !text}
        className="mt-3 inline-flex text-xs mb-4 rounded-sm bg-white px-6 py-2.5 font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 hover:border-gray-950 sm:mt-0 sm:w-auto"
      >
        {isGenerating ? 'GENERATING' : 'GENERATE'}
      </button>
      <div className="relative">
        {isGenerated && (
          <a
            href={generatedImgUrl}
            target="_blank"
            className="bg-black p-2 absolute top-2 right-2 text-xs bg-opacity-70 flex items-center"
          >
            <span className="mr-2">Open image</span>
            <div className="inline">
              <CloseIcon />
            </div>
          </a>
        )}
        <img src={isGenerated ? generatedImgUrl : imageUrl} className="object-scale-down" />
      </div>
    </div>
  );
};

export default ImageTextBuilder;
