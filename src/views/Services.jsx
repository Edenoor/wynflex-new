import Service from "../components/Service";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";

// const TurboSeal = () => {
//   return (
//     <motion.div
//       className="absolute -left-40 top-0 z-30 hidden lg:flex h-60 w-60 flex-col items-center justify-center rounded-full border border-yellow/45 bg-gray-dark/85 text-center shadow-[0_28px_90px_rgba(0,0,0,.55),0_0_80px_rgba(245,190,80,.32),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-2xl"
//       initial={{ opacity: 0, scale: 0.85, rotate: -9 }}
//       animate={{ opacity: 1, scale: 1, rotate: -9 }}
//       transition={{ duration: 0.7, ease: "easeOut" }}
//       whileHover={{ scale: 1.03, rotate: -7 }}
//     >
//       <div className="absolute inset-3 rounded-full border border-white/10" />
//       <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.16),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(245,190,80,.18),transparent_50%)]" />

//       <motion.span
//         className="relative text-6xl mb-3"
//         animate={{ y: [0, -7, 0], rotate: [-8, 5, -8] }}
//         transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
//       >
//         🚀
//       </motion.span>

//       <p className="relative text-yellow text-3xl font-semibold tracking-[0.22em]">
//         TURBO
//       </p>

//       <p className="relative text-white/75 text-sm mt-3 px-10 leading-tight">
//         Envíos en menos de 2 hs
//       </p>
//     </motion.div>
//   );
// };

const TurboSeal = () => {
  return (
    <motion.div
      className="absolute -left-40 top-0 z-30 hidden lg:flex h-60 w-60 flex-col items-center justify-center rounded-full border border-yellow/50 bg-gray-dark/90 text-center shadow-[0_0_100px_rgba(245,190,80,.5),inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-2xl"
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: -10 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-full border border-yellow/20 blur-md" />

      <motion.span
        className="text-6xl mb-3"
        animate={{ y: [0, -8, 0], rotate: [-10, 6, -10] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🚀
      </motion.span>

      <p className="text-yellow text-3xl font-semibold tracking-widest">
        TURBO
      </p>

      <p className="text-white/75 text-sm mt-3 px-10 leading-tight">
        Envíos en menos de 2 hs
      </p>
    </motion.div>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://api.whatsapp.com/send?phone=5491168484537"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-8 bottom-8 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 shadow-[0_0_30px_rgba(37,211,102,.5)]"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
    >
      <img className="h-10" src="/media/svg/whatsapp-icon.svg" alt="" />

      <span className="text-white text-sm font-medium hidden lg:block">
        Escribinos
      </span>
    </motion.a>
  );
};

const Services = () => {
  return (
    <div className="pt-20">
      <div className="mt-20 container w-full text-center">
        <h1 className="mb-4">Selecciona el servicio que necesites</h1>
        <p>
          Una experiencia segura, eficaz, simple y ágil para tu tienda virtual
        </p>
      </div>

      <div className="flex gap-12 justify-center my-20">
        <SwiperHOC
          className="overflow-visible w-full max-w-lg lg:max-w-6xl px-2 lg:px-10"
          modules={[Pagination]}
          desktopStyles={{ views: 2 }}
          mobileStyles={{ views: 1 }}
          spaceBetween={24}
        >
          <SwiperSlide>
            {({ isActive }) => (
              <div
                className={`relative transition duration-[400ms] ${
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-75"
                } lg:opacity-100 lg:scale-100`}
              >
                <TurboSeal />
                <Service full={false} />
              </div>
            )}
          </SwiperSlide>

          <SwiperSlide>
            {({ isActive }) => (
              <Service
                full={true}
                className={`transition duration-[400ms] ${
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-75"
                } lg:opacity-100 lg:scale-100`}
              />
            )}
          </SwiperSlide>
        </SwiperHOC>
      </div>

      <div className="flex flex-col items-center lg:flex-row justify-between my-28 gap-8 container">
        <div className="flex flex-col max-w-sm xl:max-w-md text-center">
          <div className="h-[180px] flex justify-center items-center">
            <img className="w-36" src="/media/svg/grow-arrow-icon.svg" alt="" />
          </div>
          <span>
            <h3 className="mb-4">El crecimiento que buscas</h3>
            <p>Es más rápido, con tu operación logística en buenas manos</p>
          </span>
        </div>

        <div className="flex flex-col max-w-sm xl:max-w-md text-center">
          <div className="h-[180px] flex justify-center items-center">
            <img className="w-36" src="/media/png/time-icon.png" alt="" />
          </div>
          <span>
            <h3 className="mb-4">Ahorra tiempo y dinero</h3>
            <p>
              Centralizando tus envíos en una logística de atención personalizada
            </p>
          </span>
        </div>

        <div className="flex flex-col max-w-sm xl:max-w-md text-center">
          <div className="h-[180px] flex justify-center items-center">
            <img className="w-36" src="/media/svg/happy-face-icon.svg" alt="" />
          </div>
          <span>
            <h3 className="mb-4">Te recomendarán</h3>
            <p>Gracias a una buena experiencia en los envíos de tus ventas</p>
          </span>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Services;