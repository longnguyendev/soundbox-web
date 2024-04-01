import React from 'react';

import Slider from 'react-slick';

export function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      <div>
        <img src="/banner1.jpeg" alt="" style={{ width: '100%' }} />
      </div>
      <div>
        <img src="/banner2.jpeg" alt="" style={{ width: '100%' }} />
      </div>
      <div>
        <img src="/banner3.jpeg" alt="" style={{ width: '100%' }} />
      </div>
      <div>
        <img src="/banner4.jpeg" alt="" style={{ width: '100%' }} />
      </div>
      <div>
        <img src="/banner5.jpeg" alt="" style={{ width: '100%' }} />
      </div>
      <div>
        <img src="/banner6.jpeg" alt="" style={{ width: '100%' }} />
      </div>
    </Slider>
  );
}
