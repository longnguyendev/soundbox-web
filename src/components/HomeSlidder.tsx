import { Box } from '@mui/material';
import React from 'react';

import Slider, { type Settings } from 'react-slick';

export function HomeSlider() {
  const settings: Settings = {
    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Box
      component={Slider}
      {...settings}
      sx={{
        '.slick-dots': {
          bottom: '20px',
          li: {
            width: 'unset',
            height: 'unset',
            button: {
              width: '20px',
              height: '20px',
              borderRadius: '40px',
              ':before': {
                content: 'unset',
              },
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              transition: 'width 0.33s linear',
            },
            margin: '0 5px',
            '&.slick-active': {
              button: {
                backgroundColor: '#fff',
                width: '40px',
                height: '20px',
              },
            },
          },
        },
      }}
    >
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
    </Box>
  );
}
