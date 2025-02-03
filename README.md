### Photo Text Builder

- A list of photos is loaded from an external API (picsum.photos)
- Scroll to the bottom to load more photos, i.e. infinite scrolling
- Click a photo to open it in the image-text editor
- Enter text in the input, click the Generate button
- A request is POSTed to a microservice API that generates a photo with the text overlayed in the image (via NestJS/node-canvas)
- Click the Open image button to view the generated photo in a new window

#### Components:

- `src/components/PhotoGrid.tsx`: the infinite scrolling image grid
- `src/components/Modal.tsx`: a modal container for the builder
- `src/components/ImageTextBuilder.tsx`: the builder with a text input that POSTs to the microservice API
