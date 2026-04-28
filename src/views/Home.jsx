import { useEffect, useState } from "react";
import Button from "../components/Button";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

const clients = Array.from({ length: 11 }, (_, i) => ({
  image: `/media/png/brand-${i}.png`
}));

const Counter = ({ target = 3000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 10 * 60 * 1000; // 10 minutos
    const start = performance.now();

    const animate = (now) => {
      const elapsed = Math.min(now - start, duration);

      let value;

      if (elapsed <= 5 * 60 * 1000) {
        // 0 → 2000 en 5 minutos
        value = (elapsed / (5 * 60 * 1000)) * 2000;
      } else {
        // 2000 → 3000 en otros 5 minutos, más lento y suave
        const secondHalfProgress =
          (elapsed - 5 * 60 * 1000) / (5 * 60 * 1000);

        value =
          2000 +
          1000 *
            (1 - Math.pow(1 - secondHalfProgress, 2.4));
      }

      setCount(Math.floor(Math.min(value, target)));

      if (elapsed < duration) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return count.toLocaleString("es-AR");
};

const AnimatedHero = () => {
  const cityGrid = [
    "M2 8 H98", "M4 16 H96", "M0 24 H100", "M8 32 H94", "M2 42 H98",
    "M6 52 H96", "M0 62 H100", "M10 72 H92", "M4 82 H96", "M12 92 H88",
    "M8 8 V96", "M18 8 V96", "M28 8 V96", "M38 8 V96", "M48 8 V96",
    "M58 8 V96", "M68 8 V96", "M78 8 V96", "M88 10 V94", "M96 14 V86",
    "M8 22 H28 V38 H46", "M52 18 H78 V34 H94", "M12 78 H34 V62 H50",
    "M62 82 H80 V66 H96", "M22 10 V28 H40 V48", "M74 12 V30 H58 V50",
    "M14 48 H30 V58 H44", "M56 44 H72 V54 H90", "M32 86 V70 H48 V54",
    "M84 22 V42 H70 V60",

    // Calles lejanas, más arriba y más tenues
    "M4 2 H92", "M12 5 H98", "M22 1 V24", "M42 0 V20", "M64 1 V26",
    "M82 2 V22", "M14 6 H34 V16 H52", "M58 5 H76 V18 H96"
  ];

  const farCityGrid = [
    "M0 0 H100", "M8 4 H92", "M18 2 V22", "M36 0 V18",
    "M54 1 V24", "M72 0 V20", "M90 3 V18",
    "M6 10 H28 V18 H48", "M52 8 H74 V17 H98"
  ];

  const trafficPaths = [
    ...cityGrid,
    "M2 12 H42 V24 H78 V36 H98",
    "M96 78 H74 V64 H52 V48 H18",
    "M14 96 V74 H30 V58 H46",
    "M90 10 V30 H72 V44 H54",
    "M4 38 H26 V52 H66 V70 H94",
    "M96 28 H82 V44 H60 V56 H30",
    "M20 10 V20 H36 V40 H52 V62 H68",
    "M76 96 V80 H60 V66 H44 V50"
  ];

  const inboundVans = [
    "M6 18 H24 V32 H38 V44 H50 V50",
    "M10 86 H30 V70 H42 V58 H50 V50",
    "M94 20 H76 V34 H62 V46 H50 V50",
    "M96 82 H74 V68 H60 V56 H50 V50",
    "M30 10 V24 H40 V38 H50 V50",
    "M80 94 V76 H66 V62 H50 V50"
  ];

  const outboundRoutes = [
    "M50 50 H64 V34 H86 V16",
    "M50 50 H76 V58 H96 V72",
    "M50 50 V68 H62 V92 H82",
    "M50 50 H62 V44 H84 V38 H96",
    "M50 50 H38 V34 H18 V16",
    "M50 50 V62 H34 V82 H10",
    "M50 50 H58 V24 H72 V10",
    "M50 50 H78 V66 H92 V92",
    "M50 50 V42 H34 V26 H10",
    "M50 50 H66 V78 H50 V96"
  ];

  const softColors = [
    "rgba(255,255,255,.36)",
    "rgba(245,190,80,.48)",
    "rgba(120,190,255,.36)",
    "rgba(255,150,120,.31)",
    "rgba(190,190,190,.28)"
  ];

  const TrafficDot = ({ path, index }) => (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(245,190,80,.32)"
        strokeWidth="0.22"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 0.16, 0.28],
          opacity: [0, 0.55, 0]
        }}
        transition={{
          duration: 2.8 + (index % 4) * 0.4,
          delay: index * 0.13,
          repeat: Infinity,
          repeatDelay: 2.4 + (index % 3) * 0.35,
          ease: "easeInOut"
        }}
      />

      <path d={path} fill="none" stroke="transparent" />
      <circle
        r={index % 5 === 0 ? "0.42" : "0.32"}
        fill={softColors[index % softColors.length]}
        filter="url(#softGlow)"
      >
        <animateMotion
          dur={`${5.8 + (index % 7) * 0.65}s`}
          repeatCount="indefinite"
          begin={`${index * 0.17}s`}
          path={path}
          keyTimes="0; .18; .3; .56; .72; 1"
          keyPoints="0; .2; .2; .62; .62; 1"
          calcMode="linear"
        />
      </circle>
    </g>
  );

  const VanIn = ({ path, index }) => (
    <g>
      <path d={path} fill="none" stroke="transparent" />
      <g filter="url(#softGlow)">
        <rect
          x="-0.92"
          y="-0.46"
          width="1.84"
          height="0.92"
          rx="0.25"
          fill="rgba(245,190,80,.95)"
        >
          <animateMotion
            dur={`${6.2 + (index % 3) * 0.55}s`}
            repeatCount="indefinite"
            begin={`${index * 0.55}s`}
            path={path}
            rotate="auto"
            keyTimes="0; .2; .28; .58; .68; 1"
            keyPoints="0; .22; .22; .62; .62; 1"
            calcMode="linear"
          />
        </rect>
      </g>
    </g>
  );

  const VanOut = ({ path, index }) => (
    <g>
      <path d={path} fill="none" stroke="transparent" />
      <g filter="url(#softGlow)">
        <rect
          x="-0.98"
          y="-0.5"
          width="1.96"
          height="1"
          rx="0.27"
          fill="rgba(245,190,80,1)"
        >
          <animateMotion
            dur={`${6.8 + (index % 4) * 0.45}s`}
            repeatCount="indefinite"
            begin={`${2.1 + index * 0.28}s`}
            path={path}
            rotate="auto"
          />
        </rect>
      </g>
    </g>
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-dark">
      <LazyLoadImage
        src="/media/jpg/hero-placeholder.jpg"
        wrapperClassName="absolute inset-0 w-full h-full opacity-10"
        placeholderSrc="/media/jpg/hero-placeholder.jpg"
        className="w-full h-full object-cover"
        alt="WYNFlex"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-gray-dark via-gray-dark/95 to-gray-dark/62 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-dark via-transparent to-gray-dark/80 z-10" />

      <motion.div
        className="absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.14 }}
        transition={{ duration: 1.1 }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.052) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.052) 1px, transparent 1px)",
          backgroundSize: "72px 72px"
        }}
      />

      <motion.div
        className="absolute z-30 hidden lg:block left-[3%] right-[4%] top-[16%] bottom-[12%] border border-white/10 rounded-[2rem]"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute z-40 hidden lg:block right-[4%] top-[14%] w-[56%] h-[74%] overflow-hidden">
        <div
          className="absolute inset-[-12%] opacity-95"
          style={{
            transform:
              "perspective(1100px) rotateX(58deg) rotateZ(-1.5deg) scale(1.38) translateY(3%)",
            transformOrigin: "52% 58%",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 34%, rgba(0,0,0,.78) 62%, rgba(0,0,0,.28) 84%, rgba(0,0,0,.08) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 34%, rgba(0,0,0,.78) 62%, rgba(0,0,0,.28) 84%, rgba(0,0,0,.08) 100%)"
          }}
        >
          <svg
            className="w-full h-full overflow-hidden"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="heroMapClip">
                <rect x="0" y="0" width="100" height="100" />
              </clipPath>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="1.35" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <radialGradient id="depotGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(245,190,80,1)" />
                <stop offset="36%" stopColor="rgba(245,190,80,.34)" />
                <stop offset="100%" stopColor="rgba(245,190,80,0)" />
              </radialGradient>
            </defs>

            <g clipPath="url(#heroMapClip)">
              {farCityGrid.map((d, index) => (
                <motion.path
                  key={`far-city-${index}`}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,.028)"
                  strokeWidth="0.12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.025, duration: 1 }}
                />
              ))}

              {cityGrid.map((d, index) => (
                <motion.path
                  key={`city-${index}`}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,.055)"
                  strokeWidth={index < 20 ? "0.14" : "0.18"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index < 20 ? 0.9 : 1 }}
                  transition={{ delay: index * 0.018, duration: 1 }}
                />
              ))}

              {trafficPaths.concat(trafficPaths, trafficPaths.slice(0, 18)).map((d, index) => (
                <TrafficDot key={`traffic-dot-${index}`} path={d} index={index} />
              ))}

              <circle cx="50" cy="50" r="13" fill="url(#depotGlow)" />
              <motion.circle
                cx="50"
                cy="50"
                r="2"
                fill="rgba(245,190,80,1)"
                filter="url(#softGlow)"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.62, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />

              {inboundVans.map((d, index) => (
                <VanIn key={`van-in-${index}`} path={d} index={index} />
              ))}

              {outboundRoutes.map((d, index) => (
                <motion.path
                  key={`out-route-${index}`}
                  d={d}
                  fill="none"
                  stroke="rgba(245,190,80,.58)"
                  strokeWidth="0.34"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 0, 1, 1],
                    opacity: [0, 0, 0.88, 0]
                  }}
                  transition={{
                    duration: 8.6,
                    delay: 2 + index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1.6,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {outboundRoutes.map((d, index) => (
                <VanOut key={`van-out-${index}`} path={d} index={index} />
              ))}

              {outboundRoutes.map((d, index) => (
                <circle
                  key={`delivery-${index}`}
                  r="1"
                  fill="rgba(245,190,80,.95)"
                  filter="url(#softGlow)"
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0;1;0"
                    dur="8.6s"
                    begin={`${5.7 + index * 0.28}s`}
                    repeatCount="indefinite"
                  />
                  <animateMotion
                    dur="0.01s"
                    begin={`${5.7 + index * 0.28}s`}
                    fill="freeze"
                    path={d}
                    keyPoints="1"
                    keyTimes="0"
                  />
                </circle>
              ))}
            </g>
          </svg>
        </div>

<motion.div
  className="absolute left-[46%] top-[46%] text-6xl drop-shadow-[0_0_34px_rgba(245,190,80,.42)]"
  initial={{ opacity: 0, y: 18, scale: 0.92 }}
  animate={{
    opacity: 1,
    y: [0, -6, 0],
    scale: [1, 1.025, 1]
  }}
  transition={{
    opacity: { delay: 1, duration: 0.7 },
    scale: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
    y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
  }}
>
  <motion.div
  className="absolute left-[50%] -translate-x-1/2 top-[46%] flex flex-col items-center pointer-events-none"
  initial={{ opacity: 0, y: 18 }}
  animate={{
    opacity: 1,
    y: [0, -10, 0]
  }}
  transition={{
    opacity: { delay: 1, duration: 0.7 },
    y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
  }}
>
  <div className="relative">
    <span className="absolute -inset-10 rounded-full bg-yellow/20 blur-2xl" />

    <svg
      viewBox="0 0 24 24"
      className="relative w-10 h-10 drop-shadow-[0_0_12px_rgba(245,190,80,.45)]"
      fill="none"
      stroke="rgba(245,190,80,0.95)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10L12 4L21 10V20H3V10Z" />
      <path d="M7 20V12H17V20" />
      <path d="M9 14H15" />
      <path d="M9 17H15" />
    </svg>
  </div>

  <motion.span
    className="mt-3 h-2 w-16 rounded-full bg-black/40 blur-md"
    animate={{ scaleX: [1, 0.7, 1], opacity: [0.3, 0.15, 0.3] }}
    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
  />
</motion.div>
</motion.div>

<motion.div
  className="absolute right-[4%] top-[4%] min-w-[240px] rounded-2xl border border-white/10 bg-gray-dark/75 px-6 py-5 shadow-2xl backdrop-blur-md"
  initial={{ opacity: 0, y: 14, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: 1.4, duration: 0.7 }}
>
  <motion.div
    className="flex flex-col gap-1 mb-4"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.7, duration: 0.6 }}
  >
    <p className="text-[10px] tracking-[0.3em] text-white/55 uppercase">
      Operación
    </p>

    <p className="text-white/90 font-semibold text-sm">
      <span className="text-yellow">+</span>3000 envíos diarios
    </p>

    <p className="text-white/75 text-sm">
      <span className="text-yellow">+</span>200 tiendas activas
    </p>
  </motion.div>

  <motion.div
    className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ delay: 1.9, duration: 0.7 }}
  />

  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.05, duration: 0.6 }}
  >
    <p className="text-[10px] tracking-[0.35em] text-yellow mb-2">
      ENTREGAS DE HOY
    </p>

    <p className="text-white font-semibold text-3xl leading-none tabular-nums text-center">
      <Counter target={3000} />
    </p>
  </motion.div>
</motion.div>
      </div>
    </div>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://api.whatsapp.com/send?phone=5491168484537"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-20 right-20 bottom-10 z-50 hidden lg:flex items-center justify-between pointer-events-none"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div className="relative flex-1 mx-12 h-12">
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 text-3xl drop-shadow-[0_0_12px_rgba(245,190,80,.45)]"
          initial={{ left: "0%" }}
          animate={{ left: "96%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "linear"
          }}
        >
          <span className="inline-block rotate-45">🚀</span>
        </motion.span>

<motion.span
  className="absolute right-0 top-1/2 -translate-y-[220%] text-yellow text-sm tracking-[0.22em] font-medium uppercase"
  initial={{ opacity: 0, y: 6 }}
  animate={{
    opacity: [0, 0, 1, 1, 0],
    y: [6, 6, 0, 0, -4]
  }}
  transition={{
    duration: 25,
    times: [0, 0.55, 0.7, 0.85, 0.93], // 👈 clave
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  Hablanos
</motion.span>
      </div>

      <div className="flex items-center justify-center rounded-full bg-gray-dark border border-white/10 p-3 shadow-[0_10px_30px_rgba(0,0,0,.5)] hover:border-yellow/40 transition pointer-events-auto">
        <img
          className="h-6 w-6"
          src="/media/svg/whatsapp-icon.svg"
          alt="WhatsApp"
        />
      </div>
    </motion.a>
  );
};

const Home = () => {
  return (
    <>
      <div className="h-screen bg-no-repeat bg-cover max-h-[968px] min-h-[568px] pt-20 relative">
        <AnimatedHero />

        <div className="relative h-full flex flex-col justify-center items-center text-center lg:text-left lg:items-start container z-50">
          <motion.div
            className="max-w-sm xl:max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-yellow uppercase tracking-[0.35em] text-xs mb-6 font-semibold">
              WYNFLEX LOGISTICS
            </p>

            <h1 className="leading-snug [text-shadow:_0px_4px_5px_rgb(0_0_0_/_40%)] mb-10">
              La solución logística para tu e-commerce
            </h1>

            <p className="text-2xl lg:text-3xl leading-snug max-w-xl">
              Convertimos tus envíos en una ventaja competitiva
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 items-center lg:items-start">
              <Button type="link" to="/servicios" className="min-w-[190px] text-center">
                Servicios
              </Button>
              <Button type="link" to="/contacto" className="min-w-[190px] text-center">
                Contactar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-20 px-4 lg:px-0 lg:py-40 flex flex-col lg:flex-row items-center relative max-w-[1920px] mx-auto gap-10 lg:gap-0">
        <div className="relative max-w-lg lg:absolute lg:max-w-none lg:w-[45%] lg:h-[90%]">
          <LazyLoadImage
            src="/media/jpg/wynflex-chica.webp"
            wrapperClassName="w-full h-full !bg-cover"
            placeholderSrc="/media/jpg/home-gif-0-placeholder.jpg"
            className="object-cover w-full h-full"
            alt="Quiénes somos"
          />
        </div>

        <div className="flex w-full mx-auto max-w-lg lg:max-w-none">
          <div className="hidden lg:block w-[45%]"></div>

          <div className="flex flex-col lg:w-1/2 lg:max-w-md xl:max-w-lg gap-8 mx-auto">
<h1>Quiénes somos</h1>
<p>
  Somos un equipo enfocado en hacer que tus envíos funcionen sin fricción.
  Nos ocupamos de toda la operación logística para que vos puedas concentrarte
  en vender. Trabajamos con procesos claros, seguimiento constante y una
  atención cercana en cada etapa, asegurando entregas confiables y a tiempo.
</p>
            <Button type="link" to="/quienes-somos" className="mx-auto lg:mx-0">
              Saber más
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center my-16">
        <h1 className="mb-12">Clientes que confían en WYNFlex</h1>

        <SwiperHOC
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          desktopStyles={{ views: 4 }}
          mobileStyles={{ views: 2 }}
          speed={4000}
          allowTouchMove={false}
          modules={[Autoplay]}
          spaceBetween={0}
          className="linear-swiper max-w-7xl relative"
          allowSlideNext={true}
          allowSlidePrev={true}
        >
          <div className="absolute w-[12%] h-full bg-gradient-to-r from-5% from-gray-dark top-0 left-0 z-20"></div>
          <div className="absolute w-[12%] h-full bg-gradient-to-l from-5% from-gray-dark top-0 right-0 z-20"></div>

          {clients.map((client, idx) => (
            <SwiperSlide key={idx}>
              <img
                className="h-40 mx-auto object-contain"
                src={client.image}
                alt={`Cliente ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </SwiperHOC>
      </div>

      <div className="py-20 px-4 lg:px-0 lg:py-40 flex flex-col lg:flex-row items-center relative max-w-[1920px] mx-auto gap-10 lg:gap-0 lg:mb-32">
        <div className="relative max-w-lg lg:absolute lg:max-w-none right-0 lg:w-[45%] lg:h-[90%]">
          <LazyLoadImage
            src="/media/jpg/wynflex-chico.webp"
            wrapperClassName="w-full h-full !bg-cover"
            placeholderSrc="/media/jpg/home-gif-1-placeholder.jpg"
            className="object-cover w-full h-full"
            alt="Servicios WYNFlex"
          />
        </div>

        <div className="flex w-full mx-auto max-w-lg lg:max-w-none">
          <div className="flex flex-col lg:w-[1/2] lg:max-w-md gap-8 mx-auto xl:max-w-lg">
            <h1>Servicios</h1>
<p>
  Centralizá tus envíos en una sola operación eficiente. Integramos tu tienda,
  retiramos tus pedidos y los entregamos en el día en CABA y GBA. Trabajamos
  con MercadoLibre, TiendaNube, Instagram y más, brindando una solución ágil,
  con seguimiento en tiempo real y respuesta inmediata.
</p>
            <Button type="link" to="/servicios" className="mx-auto lg:mx-0">
              Saber más
            </Button>
          </div>

          <div className="hidden lg:block w-[45%]"></div>
        </div>
      </div>
      <WhatsAppButton />
    </>
  );
};

export default Home;