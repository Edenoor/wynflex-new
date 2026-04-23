import { useEffect, useState } from 'react';
import { Swiper } from 'swiper/react';
import useDeviceContext from '../../hooks/useDeviceContext';


export const SwiperHOC = ({ desktopStyles = {}, mobileStyles = {}, modules = [], className = '', children, ...otherProps }) => {


    const [swiperRef, setSwiperRef] = useState(null);
    const { device, sizes } = useDeviceContext()
    const [active, setActive] = useState(true);

    useEffect(() => {
        if (device.size <= sizes['lg']) { setActive(true); return }
        else { setActive(false) }
    }, [device])

    return (
        <Swiper
            allowSlideNext={active}
            allowSlidePrev={active}
            allowTouchMove={active}
            slidesPerView={device.size >= sizes['lg'] ? desktopStyles.views : mobileStyles.views}
            modules={[...modules]}
            pagination={{ clickable: true }}
            className={`${device.size >= sizes['lg'] ? desktopStyles.classes : mobileStyles.classes} ${className}`}
            onInit={(swiper) => { setSwiperRef(swiper) }}
            {...otherProps}

        >
            {children.map((child, idx) => {
                return typeof child === 'function' ? child(swiperRef) : child
            })}
        </Swiper>
    )
}