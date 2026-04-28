const Member = ({ image, name, role, description }) => {
  return (
    <article className="group w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition duration-500 hover:border-yellow/30 hover:bg-white/[0.065] hover:shadow-[0_24px_80px_rgba(245,190,80,.12)] backdrop-blur-sm">
      <div className="relative h-72 overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
          src={image}
          alt={name}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-dark/75 via-gray-dark/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-60" />
      </div>

      <div className="p-7 text-center">
        <p className="text-yellow text-xs tracking-[0.32em] uppercase mb-3">
          {role}
        </p>

        <h3 className="mb-4 text-white">{name}</h3>

        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default Member;