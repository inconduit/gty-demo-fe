import { useState } from 'react';
import ImageTextLoader from './ImageTextLoader.tsx';

interface ImageTextBuilderProps {
  imageUrl: string;
}

const ImageTextBuilder = ({ imageUrl }: ImageTextBuilderProps) => {
  const [text, setText] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const onClickGenerate = () => {
    if (text && imageUrl) {
      setIsGenerated(true);
    }
  };

  return isGenerated ? (
    <ImageTextLoader imageUrl={imageUrl} text={text} />
  ) : (
    <div>
      <input placeholder="Enter text here" onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={() => onClickGenerate()} disabled={!text}>
        Generate
      </button>
      <img src={imageUrl} style={{ width: '100%' }} />
    </div>
  );
};

export default ImageTextBuilder;
