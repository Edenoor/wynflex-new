import { useEffect, useState } from "react";

const updateDevice = () => {
    let width = window.innerWidth;
    if (width >= 1536) return { size: width };
    if (width >= 1280) return { size: width };
    if (width >= 1024) return { size: width };
    if (width >= 768) return { size: width };
    if (width >= 640) return { size: width };
    if (width < 640) return { size: width };
};

export default function useDevice() {
    const [device, setDevice] = useState(updateDevice());
    const sizes = {
        '2xl': 1536,
        'xl': 1280,
        'lg': 1024,
        'md': 768,
        'sm': 640,
        'mb': 640,
    }

    useEffect(() => {
        window.addEventListener('resize', () => { setDevice(updateDevice()) });
    }, []);

    return { device, sizes };
}