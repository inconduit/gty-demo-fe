import './App.css';
import ImageTextBuilder from './components/ImageTextBuilder.tsx';
import PhotoGrid from './components/PhotoGrid.tsx';
import { useState } from 'react';
import Modal from './components/Modal.tsx';

function App() {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);
  const onClickPhoto = (url: string) => setSelectedPhotoUrl(url);

  return (
    <div className="w-screen">
      <PhotoGrid onClickPhoto={onClickPhoto} />
      {selectedPhotoUrl && (
        <Modal description="Generate an image with text overlay" onClickClose={() => setSelectedPhotoUrl(null)}>
          <ImageTextBuilder imageUrl={selectedPhotoUrl} />
        </Modal>
      )}
    </div>
  );
}

export default App;
