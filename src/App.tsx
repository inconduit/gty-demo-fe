import './App.css'
import ImageTextBuilder from "./components/ImageTextBuilder.tsx";

function App() {
  return (
    <>
      <div style={{ width: "100vw" }}>
        <ImageTextBuilder imageUrl="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"  />
      </div>
    </>
  )
}

export default App
