import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeaturesEffect.css'

gsap.registerPlugin(ScrollTrigger)

const DARK = '#292727'

const FEATURES = [
  {
    number: '01',
    title: 'Flex',
    description:
      'Entregas rápidas y trazables en AMBA para acompañar el ritmo de tu e-commerce.',
    mockTitle: 'Entregas del día',
    mockMetric: '98.7%',
    mockLabel: 'Entregadas',
  },
  {
    number: '02',
    title: 'Turbo',
    description:
      'Velocidad para los pedidos que no pueden esperar. Operación ágil y seguimiento en tiempo real.',
    mockTitle: 'Envíos Turbo',
    mockMetric: '2h',
    mockLabel: 'Tiempo promedio',
  },
  {
    number: '03',
    title: 'Envíos nacionales',
    description:
      'Una sola experiencia para despachar pedidos a todo el país con múltiples operadores.',
    mockTitle: 'Cobertura',
    mockMetric: '24',
    mockLabel: 'Provincias',
  },
  {
    number: '04',
    title: 'Fulfillment',
    description:
      'Stock, preparación, despacho y logística coordinados para que puedas concentrarte en crecer.',
    mockTitle: 'Pedidos',
    mockMetric: '+340',
    mockLabel: 'Procesados hoy',
  },
]

export default function FeaturesEffect() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const featuresRef = useRef(null)
  const rulerRef = useRef(null)

  const titleRef = useRef(null)
  const suptitleRef = useRef(null)

  const cardsRef = useRef([])

  const animationState = useRef({
    progress: 0,
    lineReveal: 0,
    lineExit: 0,
  })

  useLayoutEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const content = contentRef.current
    const features = featuresRef.current
    const ruler = rulerRef.current
    const title = titleRef.current
    const suptitle = suptitleRef.current

    const cards = cardsRef.current.filter(Boolean)

    if (
      !section ||
      !canvas ||
      !content ||
      !features ||
      !ruler ||
      !title ||
      !suptitle ||
      !cards.length
    ) {
      return
    }

    const ctx = canvas.getContext('2d')

    let canvasRaf
    let resizeTimer
    let timeline

    /*
     * =====================================================
     * CANVAS
     * =====================================================
     */

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    /*
     * -----------------------------------------------------
     * Recreamos la geometría del original:
     *
     * varios puntos de control distribuidos en 3 grandes
     * etapas y 6 líneas paralelas.
     * -----------------------------------------------------
     */

    const buildLinePoints = () => {
      const featuresRect = features.getBoundingClientRect()

      const width = featuresRect.width
      const height = featuresRect.height
      const left = featuresRect.left

      const progress = animationState.current.progress

      const mobile = window.innerWidth < 987

      const step1 = {
        p1: {
          x:
            left +
            0.198 * width -
            (mobile ? 0.3 * width : 0) -
            width * progress * 0.0125,

          y: -0.1 * height,
        },

        p2: {
          x:
            left +
            0.245 * width -
            (mobile ? 0.25 * width : 0) +
            width * progress * 0.025,

          y: -0.1 * height,
        },
      }

      const step2Start = {
        x:
          left +
          0.35 * width -
          width * progress * 0.05 -
          (mobile ? 0.1 * width : 0),

        y: 0.4 * height,
      }

      const diagonal = width * 0.125

      const step2 = {
        p1: step2Start,

        p2: {
          x:
            Math.cos((-25 * Math.PI) / 180) * diagonal +
            step2Start.x +
            width * progress * 0.1 +
            (mobile ? 0.1 * width : 0),

          y:
            Math.sin((-25 * Math.PI) / 180) * diagonal +
            step2Start.y,
        },
      }

      const step3 = {
        p1: {
          x:
            left +
            width * (1.25 - 0.25 * progress),

          y: height * 2,
        },

        p2: {
          x:
            left +
            width * (1.75 + progress) +
            height,

          y: height,
        },
      }

      const steps = [
        step1,
        step2,
        step3,
      ]

      const lines = Array.from(
        { length: 6 },
        () => ({
          points: [],
        }),
      )

      steps.forEach((step) => {
        const dx =
          step.p2.x -
          step.p1.x

        const dy =
          step.p2.y -
          step.p1.y

        for (
          let index = 0;
          index < 6;
          index += 1
        ) {
          lines[index].points.push({
            x:
              step.p1.x +
              (dx / 6) * index,

            y:
              step.p1.y +
              (dy / 6) * index,
          })
        }
      })

      return lines
    }

    /*
     * Dibujo suavizado.
     */

    const drawSmoothLine = (
      points,
      index,
    ) => {
      if (!points.length) return

      const reveal =
        animationState.current.lineReveal

      const exit =
        animationState.current.lineExit

      ctx.beginPath()

      ctx.moveTo(
        points[0].x,
        points[0].y,
      )

      for (
        let i = 1;
        i < points.length;
        i += 1
      ) {
        const previous =
          points[i - 1]

        const current =
          points[i]

        const next =
          points[i + 1] ||
          current

        const cp1x =
          previous.x +
          (current.x -
            previous.x) *
            0.18

        const cp1y =
          previous.y +
          (current.y -
            previous.y) *
            0.18

        const cp2x =
          current.x -
          (next.x -
            previous.x) *
            0.08

        const cp2y =
          current.y -
          (next.y -
            previous.y) *
            0.08

        ctx.bezierCurveTo(
          cp1x,
          cp1y,
          cp2x,
          cp2y,
          current.x,
          current.y,
        )
      }

      /*
       * Truco equivalente al sliceRawPath:
       * dibujamos el path progresivamente.
       */

      const stagger =
        index * 0.04

      const localReveal =
        gsap.utils.clamp(
          0,
          1,
          reveal -
            stagger,
        )

      const localExit =
        gsap.utils.clamp(
          0,
          1,
          exit -
            stagger,
        )

      const visible =
        Math.max(
          localReveal -
            localExit,
          0,
        )

      const virtualLength =
        4000

      ctx.setLineDash([
        virtualLength *
          visible,
        virtualLength,
      ])

      ctx.lineDashOffset =
        -virtualLength *
        localExit

      ctx.strokeStyle =
        DARK

      ctx.lineWidth = 1

      ctx.stroke()

      ctx.setLineDash([])
      ctx.closePath()
    }

    const drawCanvas = () => {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight,
      )

      const lines =
        buildLinePoints()

      lines.forEach(
        (line, index) => {
          drawSmoothLine(
            line.points,
            index,
          )
        },
      )
    }

    const canvasLoop = () => {
      drawCanvas()

      canvasRaf =
        requestAnimationFrame(
          canvasLoop,
        )
    }

    setCanvasSize()

    canvasRaf =
      requestAnimationFrame(
        canvasLoop,
      )

    /*
     * =====================================================
     * TIMELINE
     * =====================================================
     */

    const buildTimeline = () => {
      timeline?.scrollTrigger?.kill()
      timeline?.kill()

      ScrollTrigger.getAll()
        .filter(
          (trigger) =>
            trigger.trigger ===
            section,
        )
        .forEach((trigger) =>
          trigger.kill(),
        )

      const width =
        window.innerWidth

      const height =
        window.innerHeight

      const mobile =
        width <= 576

      const tablet =
        width > 576 &&
        width < 987

      const card =
        cards[0]

      const cardRect =
        card.getBoundingClientRect()

      const cardWidth =
        cardRect.width

      const cardHeight =
        cardRect.height

      const rulerWidth =
        ruler.offsetWidth

      /*
       * Durante el giro 3D de entrada (rotateX -90 -> 0)
       * la card todavía se está "parando" mientras se
       * traslada hacia targetY, así que su bounding box
       * pasa por una altura intermedia mayor a la final.
       *
       * Sin este margen, ese pico asoma por debajo del
       * viewport y se ve tapada justo antes de acomodarse.
       */
      const restLift =
        height * 0.18

      /*
       * Reset general.
       */

      gsap.set(cards, {
        clearProps:
          'transform',
      })

      gsap.set(cards, {
        rotateX: -90,

        y:
          cardHeight +
          height,

        x: 0,

        rotateY: 0,

        rotateZ: 0,

        scale: 1,

        transformOrigin:
          '50% var(--feature-depth)',
      })

      cards.forEach(
        (item, index) => {
          item.style.zIndex =
            index + 2
        },
      )

      gsap.set(
        [suptitle, title],
        {
          y:
            height *
            0.5,
        },
      )

      animationState.current.progress =
        0

      animationState.current.lineReveal =
        0

      animationState.current.lineExit =
        0

      /*
       * Exactamente como la referencia:
       * timeline larga vinculada a toda la sección.
       */

      timeline =
        gsap.timeline({
          scrollTrigger: {
            trigger: section,

            start:
              'top 125%',

            end:
              mobile
                ? 'bottom -25%'
                : 'bottom 25%',

            scrub: 0.5,

            invalidateOnRefresh:
              true,
          },
        })

      /*
       * Líneas entrando.
       */

      timeline.to(
        animationState.current,
        {
          lineReveal: 1,

          duration: 4,

          ease: 'none',
        },
        0.25,
      )

      /*
       * Título.
       */

      timeline.to(
        [suptitle, title],
        {
          y: 0,

          duration: 1.5,

          ease:
            'power3.out',

          stagger: 0.05,
        },
        1,
      )

      /*
       * Progreso geométrico
       * de las curvas.
       */

      timeline.to(
        animationState.current,
        {
          progress: 1,

          duration:
            7,

          ease:
            'none',
        },
        0,
      )

      /*
       * En mobile el bloque de texto
       * acompaña un poco el scroll.
       */

      if (
        width < 987
      ) {
        timeline.fromTo(
          content,
          {
            y:
              '-65%',
          },
          {
            y:
              '35%',

            duration:
              1,

            ease:
              'power3.inOut',
          },
          0,
        )
      }

      /*
       * ===================================================
       * CARDS
       * ===================================================
       */

      let enterAt =
        mobile
          ? 1.2
          : tablet
            ? 1.25
            : 0

      let moveAt =
        mobile
          ? 1.65
          : tablet
            ? 1.7
            : 1.5

      cards.forEach(
        (item) => {
          /*
           * ------------------------------------------------
           * CARD ENTRA DESDE ABAJO
           *
           * Sigue acostada.
           * ------------------------------------------------
           */

          timeline.fromTo(
            item,
            {
              y:
                cardHeight +
                height,

              rotateX: -90,

              scale: 1,
            },
            {
              y: 0,

              duration:
                0.55,

              ease:
                'power2.inOut',
            },
            enterAt,
          )

          /*
           * ------------------------------------------------
           * SE LEVANTA
           * ------------------------------------------------
           */

          timeline.to(
            item,
            {
              rotateX: 0,

              duration:
                1.1,

              ease:
                'power3.inOut',
            },
            moveAt,
          )

          /*
           * ------------------------------------------------
           * SE MUEVE HACIA ARRIBA / IZQUIERDA
           * ------------------------------------------------
           */

          const targetX =
            width < 987
              ? 0
              : -rulerWidth

          const targetY =
            width < 987
              ? -height * 0.3 -
                restLift
              : -height +
                (
                  height -
                  cardHeight +
                  ruler.offsetHeight
                ) /
                  2 -
                restLift

          timeline.to(
            item,
            {
              x: targetX,

              y: targetY,

              duration:
                1.1,

              ease:
                'power3.inOut',
            },
            moveAt,
          )

          /*
           * ------------------------------------------------
           * SALE GIRANDO EN 3D
           * ------------------------------------------------
           */

          timeline.to(
            item,
            {
              rotateZ:
                mobile
                  ? -35
                  : -65,

              rotateY:
                mobile
                  ? 25
                  : 45,

              rotateX:
                -180,

              scale: 0,

              duration:
                1.5,

              ease:
                'power1.inOut',
            },
            moveAt + 1.1,
          )

          timeline.to(
            item,
            {
              x:
                mobile
                  ? -cardWidth *
                    0.75
                  : -cardWidth *
                    2,

              duration:
                1.5,

              ease:
                'power1.inOut',
            },
            moveAt + 1.1,
          )

          timeline.to(
            item,
            {
              y:
                -(
                  height +
                  cardHeight *
                    0.5
                ),

              duration:
                1.5,

              ease:
                'power1.inOut',
            },
            moveAt + 1.1,
          )

          /*
           * La próxima card empieza
           * antes de que termine la anterior.
           */

          enterAt =
            moveAt + 0.5

          moveAt += 1
        },
      )

      /*
       * Las curvas desaparecen.
       */

      timeline.to(
        animationState.current,
        {
          lineExit: 0.55,

          duration:
            3,

          ease:
            'none',
        },
        '-=2',
      )

      /*
       * Título sale hacia arriba.
       */

      timeline.to(
        [suptitle, title],
        {
          y:
            '-20vh',

          duration:
            2,

          ease:
            'power3.in',
        },
        '-=2',
      )
    }

    /*
     * Esperamos un frame para que las
     * medidas de las cards sean reales.
     */

    requestAnimationFrame(
      () => {
        buildTimeline()
        ScrollTrigger.refresh()
      },
    )

    /*
     * =====================================================
     * RESIZE
     * =====================================================
     */

    const onResize = () => {
      clearTimeout(
        resizeTimer,
      )

      resizeTimer =
        setTimeout(() => {
          setCanvasSize()
          buildTimeline()

          ScrollTrigger.refresh()
        }, 180)
    }

    window.addEventListener(
      'resize',
      onResize,
    )

    /*
     * =====================================================
     * CLEANUP
     * =====================================================
     */

    return () => {
      clearTimeout(
        resizeTimer,
      )

      cancelAnimationFrame(
        canvasRaf,
      )

      window.removeEventListener(
        'resize',
        onResize,
      )

      timeline?.scrollTrigger?.kill()
      timeline?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="features-effect"
    >
      <canvas
        ref={canvasRef}
        className="features-effect__canvas"
      />

      {/* TEXTO IZQUIERDO */}

      <div
        ref={contentRef}
        className="features-effect__content"
      >
        <div
          ref={suptitleRef}
          className="features-effect__suptitle"
        >
          Logística
        </div>

        <h1
          ref={titleRef}
          className="features-effect__title"
        >
          Todo lo que necesitás para mover tu negocio.
        </h1>
      </div>

      {/* ESCENA DE CARDS */}

      <div
        ref={featuresRef}
        className="features-effect__features"
      >
        <div
          ref={rulerRef}
          className="features-effect__ruler"
        />

        {FEATURES.map(
          (feature, index) => (
            <article
              key={feature.number}
              ref={(element) => {
                cardsRef.current[
                  index
                ] = element
              }}
              className="feature-card"
            >
              <div className="feature-card__side feature-card__side--horizontal" />

              <div className="feature-card__side feature-card__side--vertical" />

              <div className="feature-card__inner">
                <div className="feature-card__counter">
                  <span>
                    {
                      feature.number
                    }
                  </span>

                  <span>
                    {String(
                      FEATURES.length,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>
                </div>

                <div className="feature-card__content">
                  <h2 className="feature-card__title">
                    {
                      feature.title
                    }
                  </h2>

                  <p className="feature-card__description">
                    {
                      feature.description
                    }
                  </p>
                </div>

                <div className="feature-card__images">
                  <div className="feature-card__image">
                    <div className="feature-card__mock">
                      <p className="feature-card__mock-label">
                        {
                          feature.mockLabel
                        }
                      </p>

                      <p className="feature-card__mock-title">
                        {
                          feature.mockTitle
                        }
                      </p>

                      <div className="feature-card__mock-metric">
                        {
                          feature.mockMetric
                        }
                      </div>

                      <div className="feature-card__mock-bars">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>

                  <div className="feature-card__image">
                    <div className="feature-card__mock">
                      <p className="feature-card__mock-label">
                        Control
                      </p>

                      <p className="feature-card__mock-title">
                        Seguimiento
                      </p>

                      <div className="feature-card__mock-metric">
                        24/7
                      </div>

                      <div className="feature-card__mock-bars">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  )
}
