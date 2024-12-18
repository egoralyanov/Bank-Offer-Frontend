import './ImageCarousel.css';
import Carousel from 'react-bootstrap/Carousel';
import defaultImage1 from '../assets/1.png'
import defaultImage2 from '../assets/2.png'
import defaultImage3 from '../assets/3.png'

function ImageCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
            className="carousel-image"
            src={defaultImage1}
            alt="Изображение"
        />
        <Carousel.Caption>
          <h3>Эквайринг</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className="carousel-image"
            src={defaultImage2}
            alt="Изображение"
        />
        <Carousel.Caption>
          <h3>Зарплатный проект</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className="carousel-image"
            src={defaultImage3}
            alt="Изображение"
        />
        <Carousel.Caption>
          <h3>РКО</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
