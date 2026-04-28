import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container border-t border-white/15 py-8 mt-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <h3 className="text-lg font-medium mb-3">WYNFlex</h3>

          <p className="text-sm text-white/65 leading-relaxed">
            Soluciones logísticas para tiendas online y operaciones de
            e-commerce.
          </p>

          <div className="flex items-center gap-4 mt-5">
            <a href="https://api.whatsapp.com/send?phone=5491168484537">
              <img
                className="h-7 opacity-80 hover:opacity-100 transition"
                src="/media/svg/whatsapp-icon.svg"
                alt="WhatsApp"
              />
            </a>

            <a href="https://www.instagram.com/wynflex/">
              <img
                className="h-7 opacity-80 hover:opacity-100 transition"
                src="/media/svg/instagram-icon.svg"
                alt="Instagram"
              />
            </a>

            <a href="https://www.linkedin.com/in/wynflex-log%C3%ADstica-integral-935a29274/">
              <img
                className="h-7 opacity-80 hover:opacity-100 transition"
                src="/media/svg/linkedin-icon.svg"
                alt="LinkedIn"
              />
            </a>
          </div>

          <a
            className="inline-block mt-4 text-sm text-white/60 hover:text-white transition"
            href="mailto:administracion@wynflex.com"
          >
            administracion@wynflex.com
          </a>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-white/60">
          <h4 className="text-white/90 text-sm font-medium mb-2">Secciones</h4>
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/quienes-somos" className="hover:text-white transition">Quienes somos</Link>
          <Link to="/servicios" className="hover:text-white transition">Servicios</Link>
          <Link to="/empleos" className="hover:text-white transition">Sumate al equipo</Link>
        </nav>

        <div className="max-w-xs text-sm text-white/50 leading-relaxed">
          <p className="mb-2">Diseño y desarrollo</p>
          <div className="flex flex-col gap-1">
            <a
              href="https://www.linkedin.com/in/micaela-montero/"
              className="hover:text-white transition"
            >
              UX/UI · Micaela Wikon
            </a>
            <a
              href="https://www.linkedin.com/in/martin-bejarano-589001206/"
              className="hover:text-white transition"
            >
              Desarrollo web · Martín Bejarano
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-4">
        <p className="text-center text-[11px] leading-relaxed text-white/40">
          ® WYNFLEX — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;