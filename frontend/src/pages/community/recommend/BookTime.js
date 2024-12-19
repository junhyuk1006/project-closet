import Slider from 'react-slick';
import './BookTime.css';

export default function BookTime({ select, setSelect }) {
  const timeList = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
  };

  return (
    <div className="book-time-container">
      <div className="slider-container">
        <Slider {...settings}>
          {timeList.map((time, idx) => (
            <div key={idx}>
              <h3
                className={`${select === time ? 'active' : ''}`}
                onClick={() => setSelect(time)}
              >
                {time}:00
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
