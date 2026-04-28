import { motion } from "framer-motion";

const Jobs = () => {
  return (
    <div className="pt-20 px-4 min-h-screen bg-gray-dark flex items-center justify-center">
      
      <div className="w-full max-w-xl text-center flex flex-col items-center gap-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4">Sumate al equipo</h1>

          <p className="text-white/70">
            Buscamos personas comprometidas, ágiles y con ganas de crecer.  
            En WynFlex priorizamos la comunicación directa para brindar un proceso rápido y personalizado.
          </p>
        </motion.div>

        {/* CTA principal */}
        <motion.a
          href="https://api.whatsapp.com/send?phone=5491168484537"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full max-w-sm flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 hover:border-yellow/40 transition overflow-hidden group"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Glow sutil */}
          <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 
          bg-[radial-gradient(circle_at_30%_50%,rgba(245,190,80,0.15),transparent_60%)]" />

          {/* Contenido */}
          <span className="relative z-10 flex justify-between w-full items-center">
            <span className="tracking-wide">Quiero sumarme al equipo</span>
            <img
              className="h-5 w-5"
              src="/media/svg/whatsapp-icon.svg"
              alt="WhatsApp"
            />
          </span>
        </motion.a>

        {/* Texto secundario (no compite) */}
        <motion.p
          className="text-white/50 text-sm max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¿Buscás contratar el servicio o hacer seguimiento de un envío?{" "}
          <a href="/contacto" className="text-yellow hover:underline">
            Ir a contacto
          </a>
        </motion.p>

      </div>
    </div>
  );
};

export default Jobs;