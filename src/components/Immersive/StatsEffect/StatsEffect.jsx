import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StatsEffect.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * A diferencia de ImmersiveEffect / MessageEffect / FeaturesEffect,
 * esta sección no arma su propio Lenis: es un reveal de un viewport,
 * no un scroll-scrub largo, así que le alcanza con el scroll nativo
 * + ScrollTrigger. Menos acoplamiento si en algún momento conviven
 * varias de estas secciones en la misma página.
 */

export default function StatsEffect() {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)
  const cardRef = useRef(null)
  const ctaRef = useRef(null)

  const digitRefs = useRef([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const watermark = watermarkRef.current
    const card = cardRef.current
    const cta = ctaRef.current

    const digits = digitRefs.current.filter(Boolean)

    if (!section || !watermark || !card || !cta || !digits.length) {
      return
    }

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (prefersReducedMotion) {
      gsap.set(digits, { opacity: 1, x: 0 })
      gsap.set(card, { opacity: 1, y: 0 })
      gsap.set(cta, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: false,
          toggleActions: 'play none none reverse',
        },
      })

      /*
       * Los dígitos del watermark entran cada uno desde su propio
       * lado (los de la izquierda desde la izquierda, etc.), como
       * si el número se estuviera "cerrando" sobre el centro.
       */
      digits.forEach((digit, index) => {
        const fromX =
          (index - (digits.length - 1) / 2) * 60

        tl.fromTo(
          digit,
          {
            opacity: 0,
            x: fromX,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          index * 0.06,
        )
      })

      tl.fromTo(
        card,
        {
          opacity: 0,
          y: 36,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        0.25,
      )

      tl.fromTo(
        cta,
        {
          opacity: 0,
          y: 14,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2.4)',
        },
        0.55,
      )
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stats-effect"
    >
      <div
        ref={watermarkRef}
        className="stats-effect__watermark"
        aria-hidden="true"
      >
        <span
          ref={(el) => {
            digitRefs.current[0] = el
          }}
          className="stats-effect__digit"
        >
          2
        </span>

        <span
          ref={(el) => {
            digitRefs.current[1] = el
          }}
          className="stats-effect__digit"
        >
          4
        </span>

        <span
          ref={(el) => {
            digitRefs.current[2] = el
          }}
          className="stats-effect__digit stats-effect__digit--slash"
        >
          /
        </span>

        <span
          ref={(el) => {
            digitRefs.current[3] = el
          }}
          className="stats-effect__digit"
        >
          7
        </span>
      </div>

      <article
        ref={cardRef}
        className="stats-effect__card"
      >
        <span className="stats-effect__badge">
          Operación
        </span>

        <p className="stats-effect__stat">
          24/7
        </p>

        <hr className="stats-effect__divider" />

        <p className="stats-effect__copy">
          Seguimiento y soporte activo los 365 días
          del año. Tu operación no para, la logística
          tampoco.
        </p>
      </article>

      <div className="stats-effect__cta-wrap">
        <a
          ref={ctaRef}
          className="stats-effect__cta"
          href="#contacto"
        >
          Contactar
        </a>
      </div>
    </section>
  )
}
