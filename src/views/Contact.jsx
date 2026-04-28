const Contact = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-dark flex items-center">
      <div className="container">
        <div className="border-y border-white/20 py-14 flex flex-col gap-10 max-w-xl">
          <div>
            <p className="text-white/85 leading-relaxed">
              Potenciando el comercio virtual, brindamos soluciones para tiendas
              online. Seguinos en redes.
            </p>

            <div className="flex gap-6 mt-6">
              <a href="https://es-la.facebook.com/wynflexlogistica" target="_blank" rel="noopener noreferrer">
                <img className="h-10 opacity-80 hover:opacity-100 transition" src="/media/svg/facebook-icon.svg" alt="Facebook" />
              </a>

              <a href="https://www.instagram.com/wynflex/" target="_blank" rel="noopener noreferrer">
                <img className="h-10 opacity-80 hover:opacity-100 transition" src="/media/svg/instagram-icon.svg" alt="Instagram" />
              </a>

              <a href="https://www.linkedin.com/in/wynflex-log%C3%ADstica-integral-935a29274/" target="_blank" rel="noopener noreferrer">
                <img className="h-10 opacity-80 hover:opacity-100 transition" src="/media/svg/linkedin-icon.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white/85 leading-relaxed">
              ¿Querés contratar nuestros servicios personalmente? Comunicate con
              nuestro equipo por WhatsApp.
            </p>

            <a
              href="https://api.whatsapp.com/send?phone=5491168484537"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6"
            >
              <img className="h-10 opacity-80 hover:opacity-100 transition" src="/media/svg/whatsapp-icon.svg" alt="WhatsApp" />
              <span className="text-yellow text-sm tracking-[0.18em] uppercase">
                Hablanos
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;