import Member from "../components/Member";

const members = [
  {
    image: "/media/jpg/wynflex-tecnology-byn.webp",
    name: "Tecnología",
    role: "Seguimiento",
    description:
      "Integramos herramientas digitales para visualizar recorridos, coordinar entregas y mantener información clara en tiempo real."
  },
  {
    image: "/media/jpg/wynflex-camioneta-byn.webp",
    name: "Operaciones",
    role: "Coordinación",
    description:
      "Organizamos cargas, recorridos y equipos para que cada envío salga preparado y llegue con una operación ordenada."
  },
  {
    image: "/media/jpg/wynflex-support-byn.webp",
    name: "Atención",
    role: "Soporte",
    description:
      "Acompañamos a nuestros clientes con asistencia personalizada en cada instancia del proceso logístico."
  }
];

const AboutUs = () => {
  return (
    <div className="pt-20">
      <span className="inline-block my-20 w-full text-center">
        <h1 className="mb-4">Quienes somos</h1>
        <p>
          Una experiencia segura, eficaz, simple y ágil para tu tienda virtual
        </p>
      </span>

      <div className="lg:py-40 gap-12 lg:gap-0 flex flex-col lg:flex-row items-center relative max-w-[1920px] mx-auto px-4 lg:px-0">
        <div className="lg:absolute max-w-lg lg:max-w-none lg:w-[45%] lg:h-[90%]">
          <img
            className="object-cover w-full h-full"
            src="/media/jpg/wynflex-team-byn.webp"
            alt="Equipo WYNFlex"
          />
        </div>

        <div className="flex max-w-lg lg:max-w-none w-full mx-auto mb-auto">
          <div className="hidden lg:block w-[45%]"></div>

          <div className="flex flex-col lg:w-1/2 lg:max-w-lg gap-8 mx-auto">
            <p>
              Comenzamos hace diez años brindando servicios de mensajería y
              cadetería. Nuestro objetivo de cada día es lograr el 100% de
              entregas aseguradas. Ofrecemos cobertura en todo CABA y GBA,
              nuestra aspiración es expandirnos a otras provincias para seguir
              brindando nuestro servicio como su aliado en la logística.
              También ofrecemos servicios de mensajería regular para todas las
              plataformas de e-commerce, Instagram, MarketPlace, TiendaNube y
              particulares.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:gap-32 my-16 max-w-5xl mx-auto px-4 lg:px-0">
        <div className="flex flex-col max-w-md">
          <div className="h-[195px] flex justify-center items-center">
            <img className="w-40" src="/media/svg/grow-arrow-icon.svg" alt="" />
          </div>
          <span className="inline-block text-center">
            <h1 className="mb-4 text-center">VISIÓN</h1>
            <p className="font-medium">
              Empática. Siempre tenemos presente a las personas, eso nos permite
              ser un buen equipo capaz de brindar una buena experiencia.
            </p>
          </span>
        </div>

        <div className="flex flex-col max-w-md">
          <div className="h-[195px] flex justify-center items-center">
            <img className="w-40" src="/media/svg/happy-face-icon.svg" alt="" />
          </div>
          <span className="inline-block text-center">
            <h1 className="mb-4 text-center">VALORES</h1>
            <p className="font-medium">
              Cuidamos nuestra reputación cuidando la de las empresas y
              emprendimientos que nos elijen.
            </p>
          </span>
        </div>
      </div>

<div className="relative my-24 overflow-hidden px-4 py-16">
  <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
  <div className="absolute right-[10%] bottom-[12%] h-80 w-80 rounded-full bg-white/5 blur-3xl" />

  <div
    className="absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
      backgroundSize: "72px 72px"
    }}
  />

  <div className="relative z-10 max-w-7xl grid lg:grid-cols-3 place-items-center gap-8 gap-y-20 mx-auto">
    {members.map((member, idx) => (
      <Member
        key={idx}
        image={member.image}
        name={member.name}
        role={member.role}
        description={member.description}
      />
    ))}
  </div>
</div>
    </div>
  );
};

export default AboutUs;