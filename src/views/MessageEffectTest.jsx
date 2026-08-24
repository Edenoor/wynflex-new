import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const DARK = '#292727'
const CREAM = '#f3f1eb'
const YELLOW = '#f5d84b'

function splitWords(text) {
  const words = text.split(' ')

  return words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="msg-word"
    >
      {word}
      {index < words.length - 1 ? '\u00A0' : ''}
    </span>
  ))
}

export default function MessageEffectTest() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  const message1Ref = useRef(null)
  const message2Ref = useRef(null)

  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  const smallRef = useRef(null)

  const finalLine1Ref = useRef(null)
  const finalLine2Ref = useRef(null)

  const lineState = useRef({
    width: 0,
  })

  const totalLines = 7

  const firstLine = useMemo(
    () => splitWords('Hacer crecer'),
    [],
  )

  const secondLine = useMemo(
    () => splitWords('un e-commerce'),
    [],
  )

  const thirdLine = useMemo(
    () => splitWords('es complejo.'),
    [],
  )

  useLayoutEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current

    const message1 = message1Ref.current
    const message2 = message2Ref.current

    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const line3 = line3Ref.current

    const small = smallRef.current

    const finalLine1 = finalLine1Ref.current
    const finalLine2 = finalLine2Ref.current

    if (
      !section ||
      !canvas ||
      !message1 ||
      !message2 ||
      !line1 ||
      !line2 ||
      !line3 ||
      !small ||
      !finalLine1 ||
      !finalLine2
    ) {
      return
    }

    const ctx = canvas.getContext('2d')

    let lenisRaf
    let canvasRaf
    let resizeTimeout

    /*
     * =====================================================
     * LENIS
     * =====================================================
     */

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const lenisLoop = (time) => {
      lenis.raf(time)
      lenisRaf = requestAnimationFrame(lenisLoop)
    }

    lenisRaf = requestAnimationFrame(lenisLoop)

    /*
     * =====================================================
     * CANVAS
     * =====================================================
     */

    const setCanvasSize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
      )

      canvas.width =
        window.innerWidth * dpr

      canvas.height =
        window.innerHeight * dpr

      canvas.style.width =
        `${window.innerWidth}px`

      canvas.style.height =
        `${window.innerHeight}px`

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      )
    }

    const getInitialLineWidth = () =>
      window.innerWidth /
      (totalLines - 1)

    const drawLines = () => {
      const width =
        lineState.current.width

      const totalWidth =
        width *
        (totalLines - 1)

      const offset =
        (
          window.innerWidth -
          totalWidth
        ) / 2

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight,
      )

      for (
        let i = 0;
        i < totalLines;
        i += 1
      ) {
        const x =
          offset +
          i * width

        ctx.beginPath()

        ctx.moveTo(
          x,
          0,
        )

        ctx.lineTo(
          x,
          window.innerHeight,
        )

        ctx.strokeStyle =
          'rgba(243,241,235,.13)'

        ctx.lineWidth = 1

        ctx.stroke()
        ctx.closePath()
      }
    }

    const canvasLoop = () => {
      drawLines()

      canvasRaf =
        requestAnimationFrame(
          canvasLoop,
        )
    }

    setCanvasSize()

    lineState.current.width =
      getInitialLineWidth()

    canvasRaf =
      requestAnimationFrame(
        canvasLoop,
      )

    /*
     * =====================================================
     * PALABRAS
     * =====================================================
     */

    const words =
      Array.from(
        message1.querySelectorAll(
          '.msg-word',
        ),
      )

    let initialWordScale = 1
    let smallX = 0
    let smallY = 0
    let line3Shift = 0

    /*
     * Esta función hace la parte importante:
     *
     * 1. mide el copy real
     * 2. calcula cuánto puede crecer
     * 3. calcula transform-origin por palabra
     * 4. posiciona el subtítulo según la tercera línea
     *
     * Nada queda atado a un left: 70%.
     */

    const measureComposition = () => {
      const viewportWidth =
        window.innerWidth

      const viewportHeight =
        window.innerHeight

      const desktop =
        viewportWidth > 987

      const mobile =
        viewportWidth <= 576

      /*
       * Limpiamos animaciones antes
       * de medir el layout natural.
       */

      gsap.set(words, {
        scale: 1,
      })

      gsap.set(
        [line1, line2, line3],
        {
          x: 0,
        },
      )

      gsap.set(small, {
        x: 0,
        y: 0,
      })

      /*
       * Ancho máximo que queremos
       * permitirle al copy.
       */

      const availableWidth =
        desktop
          ? viewportWidth * 0.72
          : viewportWidth - 32

      /*
       * Ajuste dinámico de font-size.
       *
       * Primero usamos el tamaño CSS
       * y luego corregimos si alguna
       * línea excede availableWidth.
       */

      message1.style.removeProperty(
        '--message-font-size',
      )

      const lineRects = [
        line1.getBoundingClientRect(),
        line2.getBoundingClientRect(),
        line3.getBoundingClientRect(),
      ]

      const widestLine =
        Math.max(
          ...lineRects.map(
            (rect) => rect.width,
          ),
        )

      const currentFontSize =
        parseFloat(
          getComputedStyle(
            message1,
          ).fontSize,
        )

      let correctedFontSize =
        currentFontSize

      if (
        widestLine >
        availableWidth
      ) {
        correctedFontSize =
          currentFontSize *
          (
            availableWidth /
            widestLine
          )
      }

      /*
       * Evitamos que quede demasiado
       * chico en pantallas grandes.
       */

      if (desktop) {
        correctedFontSize =
          Math.max(
            correctedFontSize,
            52,
          )
      }

      if (mobile) {
        correctedFontSize =
          Math.max(
            correctedFontSize,
            32,
          )
      }

      message1.style.setProperty(
        '--message-font-size',
        `${correctedFontSize}px`,
      )

      /*
       * Volvemos a medir después del
       * ajuste de font-size.
       */

      const rect1 =
        line1.getBoundingClientRect()

      const rect2 =
        line2.getBoundingClientRect()

      const rect3 =
        line3.getBoundingClientRect()

      const messageRect =
        message1.getBoundingClientRect()

      const widest =
        Math.max(
          rect1.width,
          rect2.width,
          rect3.width,
        )

      /*
       * Escala inicial:
       *
       * misma idea conceptual
       * del original.
       *
       * Queremos que el copy inicial
       * sea grande, pero no arbitrario.
       */

      const targetInitialWidth =
        desktop
          ? viewportWidth * 1.08
          : viewportWidth * 0.98

      initialWordScale =
        targetInitialWidth /
        widest

      initialWordScale =
        Math.max(
          initialWordScale,
          1.08,
        )

      initialWordScale =
        Math.min(
          initialWordScale,
          desktop ? 1.8 : 1.35,
        )

      /*
       * Centro de la composición.
       */

      const centerX =
        messageRect.left +
        messageRect.width / 2

      const centerY =
        messageRect.top +
        messageRect.height / 2

      /*
       * Transform origin por palabra.
       *
       * Las palabras más alejadas del
       * centro se expanden hacia afuera.
       */

      words.forEach((word) => {
        const rect =
          word.getBoundingClientRect()

        const wordCenterX =
          rect.left +
          rect.width / 2

        const wordCenterY =
          rect.top +
          rect.height / 2

        const dx =
          centerX -
          wordCenterX

        const dy =
          centerY -
          wordCenterY

        word.style.setProperty(
          '--origin-x',
          `${dx * 0.9}px`,
        )

        word.style.setProperty(
          '--origin-y',
          `${dy * 0.9}px`,
        )
      })

      /*
       * ===================================================
       * SUBTÍTULO
       * ===================================================
       */

      if (desktop) {
        /*
         * Queremos que el subtítulo
         * nazca a la derecha de
         * "es complejo."
         *
         * Calculamos su posición con
         * medidas reales.
         */

        const messageCenterX =
          messageRect.left +
          messageRect.width / 2

        const line3CenterX =
          rect3.left +
          rect3.width / 2

        const line3RelativeRight =
          (
            rect3.right -
            messageCenterX
          )

        /*
         * Dejamos aproximadamente
         * 40px / 2vw de aire.
         */

        const gap =
          Math.max(
            30,
            viewportWidth * 0.022,
          )

        smallX =
          line3RelativeRight +
          gap

        /*
         * Lo alineamos verticalmente
         * con el centro de tercera línea.
         */

        const line3CenterY =
          rect3.top +
          rect3.height / 2

        const messageCenterY =
          messageRect.top +
          messageRect.height / 2

        smallY =
          line3CenterY -
          messageCenterY

        /*
         * Si el subtítulo no entra,
         * desplazamos apenas la tercera
         * línea hacia la izquierda.
         */

        const smallWidth =
          Math.min(
            viewportWidth * 0.25,
            400,
          )

        const projectedRight =
          viewportWidth / 2 +
          smallX +
          smallWidth

        const overflow =
          projectedRight -
          (
            viewportWidth -
            40
          )

        line3Shift =
          overflow > 0
            ? -overflow
            : 0
      } else {
        /*
         * Tablet y mobile:
         * subtítulo debajo.
         */

        smallX = 0
        smallY = 0
        line3Shift = 0
      }
    }

    measureComposition()

    /*
     * =====================================================
     * ESTADO INICIAL
     * =====================================================
     */

    gsap.set(
      [message1, message2],
      {
        xPercent: -50,
        yPercent: -50,
      },
    )

    gsap.set(
      message1,
      {
        y:
          window.innerHeight *
          1.02,
      },
    )

    gsap.set(
      words,
      {
        scale:
          initialWordScale,
      },
    )

    gsap.set(
      small,
      {
        opacity: 0,

        x:
          window.innerWidth >
          987
            ? smallX + 80
            : 0,

        y:
          window.innerWidth >
          987
            ? smallY
            : 30,
      },
    )

    gsap.set(
      message2,
      {
        y:
          window.innerHeight *
          1.08,
      },
    )

    /*
     * =====================================================
     * TIMELINE
     * =====================================================
     */

    const initialLineWidth =
      getInitialLineWidth()

    const compressedLineWidth =
      initialLineWidth *
      0.4

    const tl =
      gsap.timeline({
        scrollTrigger: {
          trigger:
            section,

          start:
            'top top',

          end:
            'bottom bottom',

          scrub:
            0.25,

          invalidateOnRefresh:
            true,
        },
      })

    /*
     * -----------------------------------------------------
     * 1 — Entra la frase grande
     * -----------------------------------------------------
     */

    tl.to(
      message1,
      {
        y: 0,

        duration: 0.9,

        ease:
          'expo.out',
      },
      0.45,
    )

    /*
     * -----------------------------------------------------
     * 2 — Las líneas verticales se comprimen
     * -----------------------------------------------------
     */

    tl.to(
      lineState.current,
      {
        width:
          compressedLineWidth,

        duration:
          1.15,

        ease:
          'expo.inOut',
      },
      1,
    )

    /*
     * -----------------------------------------------------
     * 3 — Las palabras vuelven a escala normal
     * -----------------------------------------------------
     */

    tl.to(
      words,
      {
        scale: 1,

        duration:
          0.8,

        ease:
          'expo.inOut',

        stagger: {
          each:
            0.045,
        },
      },
      1.35,
    )

    /*
     * -----------------------------------------------------
     * 4 — Pausa visual
     * -----------------------------------------------------
     */

    tl.to(
      {},
      {
        duration:
          0.35,
      },
      2.2,
    )

    /*
     * -----------------------------------------------------
     * 5 — Reacomodamos tercera línea
     *     y aparece subtítulo
     * -----------------------------------------------------
     */

    if (
      window.innerWidth >
      987
    ) {
      tl.to(
        line3,
        {
          x:
            line3Shift,

          duration:
            0.45,

          ease:
            'expo.inOut',
        },
        2.5,
      )

      tl.to(
        small,
        {
          opacity: 1,

          x:
            smallX,

          y:
            smallY,

          duration:
            0.5,

          ease:
            'expo.out',
        },
        2.62,
      )
    } else {
      tl.to(
        small,
        {
          opacity: 1,

          y: 0,

          duration:
            0.5,

          ease:
            'expo.out',
        },
        2.55,
      )
    }

    /*
     * -----------------------------------------------------
     * 6 — Hold
     * -----------------------------------------------------
     */

    tl.to(
      {},
      {
        duration:
          0.75,
      },
      3.05,
    )

    /*
     * -----------------------------------------------------
     * 7 — Sale primera escena
     * -----------------------------------------------------
     */

    tl.to(
      message1,
      {
        y:
          -window.innerHeight *
          1.08,

        duration:
          0.75,

        ease:
          'expo.in',
      },
      3.8,
    )

    /*
     * -----------------------------------------------------
     * 8 — Entra cierre
     * -----------------------------------------------------
     */

    tl.to(
      message2,
      {
        y: 0,

        duration:
          0.95,

        ease:
          'expo.out',
      },
      4.25,
    )

    /*
     * Las líneas se juntan todavía más.
     */

    tl.to(
      lineState.current,
      {
        width:
          compressedLineWidth *
          0.72,

        duration:
          1.5,

        ease:
          'power4.inOut',
      },
      4.25,
    )

    /*
     * -----------------------------------------------------
     * 9 — Hold final
     * -----------------------------------------------------
     */

    tl.to(
      {},
      {
        duration:
          1.65,
      },
      5.2,
    )

    /*
     * -----------------------------------------------------
     * 10 — Salida
     * -----------------------------------------------------
     */

    tl.to(
      message2,
      {
        y:
          -window.innerHeight *
          0.72,

        duration:
          1.15,

        ease:
          'power3.in',
      },
      6.75,
    )

    ScrollTrigger.refresh()

    /*
     * =====================================================
     * RESIZE
     * =====================================================
     */

    const onResize = () => {
      clearTimeout(
        resizeTimeout,
      )

      resizeTimeout =
        setTimeout(() => {
          setCanvasSize()

          lineState.current.width =
            getInitialLineWidth()

          measureComposition()

          ScrollTrigger.refresh()
        }, 150)
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
        resizeTimeout,
      )

      cancelAnimationFrame(
        lenisRaf,
      )

      cancelAnimationFrame(
        canvasRaf,
      )

      window.removeEventListener(
        'resize',
        onResize,
      )

      tl.scrollTrigger?.kill()
      tl.kill()

      lenis.destroy()
    }
  }, [])

  return (
    <>
      <style>
        {`
          .message-effect-page {
            margin: 0;
            background: ${DARK};
          }

          .message-effect {
            position: relative;

            height: 800lvh;

            overflow: hidden;

            clip-path: inset(0);

            background: ${DARK};
          }

          .message-effect__inner {
            position: fixed;

            inset: 0;

            width: 100%;
            height: 100lvh;

            overflow: hidden;

            background: ${DARK};
          }

          .message-effect__canvas {
            position: absolute;

            inset: 0;

            z-index: 1;

            width: 100%;
            height: 100%;

            pointer-events: none;
          }

          .message-effect__message {
            position: absolute;

            top: 50%;
            left: 50%;

            z-index: 2;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            will-change: transform;
          }

          /*
           * ================================================
           * PRIMER MENSAJE
           * ================================================
           */

          .message-effect__message--1 {
            width:
              min(
                78vw,
                1380px
              );

            font-size:
              var(
                --message-font-size,
                min(
                  6.4rem,
                  5.9vw
                )
              );

            font-weight: 600;

            line-height: .91;

            letter-spacing:
              -.06em;
          }

          .message-effect__big {
            color: ${CREAM};

            white-space: nowrap;

            text-align: center;
          }

          .message-effect__message--1
          .message-effect__big {
            width: fit-content;
          }

          .message-effect__message--1
          .message-effect__big:nth-child(2) {
            margin-top: .06em;
          }

          .message-effect__message--1
          .message-effect__big:nth-child(3) {
            margin-top: .06em;
          }

          /*
           * Cada palabra es una unidad
           * independiente de escala.
           */

          .msg-word {
            display: inline-block;

            transform-origin:
              calc(
                50% +
                var(
                  --origin-x,
                  0px
                )
              )
              calc(
                50% +
                var(
                  --origin-y,
                  0px
                )
              );

            will-change:
              transform;
          }

          /*
           * ================================================
           * SUBTÍTULO
           * ================================================
           */

          .message-effect__small {
            position: absolute;

            top: 50%;
            left: 50%;

            width:
              min(
                25vw,
                400px
              );

            margin: 0;

            color:
              ${YELLOW};

            font-size:
              clamp(
                15px,
                1.22vw,
                22px
              );

            font-weight:
              500;

            line-height:
              1.16;

            letter-spacing:
              -.03em;

            text-align:
              left;

            will-change:
              transform,
              opacity;
          }

          /*
           * ================================================
           * MENSAJE FINAL
           * ================================================
           */

          .message-effect__message--2 {
            width:
              min(
                78vw,
                1400px
              );

            color:
              ${CREAM};

            font-size:
              min(
                8.1rem,
                7.2vw
              );

            font-weight:
              600;

            line-height:
              .89;

            letter-spacing:
              -.065em;
          }

          .message-effect__message--2
          .message-effect__big {
            width: 100%;

            color:
              ${CREAM};
          }

          .message-effect__message--2
          .message-effect__big:first-child {
            text-align: left;
          }

          .message-effect__message--2
          .message-effect__big:last-child {
            margin-top:
              .12em;

            color:
              ${YELLOW};

            text-align:
              right;
          }

          /*
           * ================================================
           * TABLET
           * ================================================
           */

          @media (
            max-width: 987px
          ) {
            .message-effect {
              height:
                650lvh;
            }

            .message-effect__message--1 {
              width:
                calc(
                  100% -
                  40px
                );

              font-size:
                var(
                  --message-font-size,
                  9vw
                );
            }

            .message-effect__message--2 {
              width:
                calc(
                  100% -
                  40px
                );

              font-size:
                10.5vw;
            }

            .message-effect__small {
              position: relative;

              top: auto;
              left: auto;

              width:
                min(
                  75vw,
                  430px
                );

              margin-top:
                34px;

              text-align:
                center;
            }
          }

          /*
           * ================================================
           * MOBILE
           * ================================================
           */

          @media (
            max-width: 576px
          ) {
            .message-effect {
              height:
                550lvh;
            }

            .message-effect__message--1 {
              width:
                calc(
                  100% -
                  28px
                );

              line-height:
                .95;
            }

            .message-effect__message--2 {
              width:
                calc(
                  100% -
                  28px
                );

              font-size:
                12vw;

              line-height:
                .94;
            }

            .message-effect__big {
              white-space:
                nowrap;
            }

            .message-effect__small {
              width:
                min(
                  86vw,
                  380px
                );

              margin-top:
                26px;

              font-size:
                15px;
            }
          }
        `}
      </style>

      <main className="message-effect-page">
        <section
          ref={sectionRef}
          className="message-effect"
        >
          <div className="message-effect__inner">
            <canvas
              ref={canvasRef}
              className="message-effect__canvas"
            />

            {/* PRIMER MENSAJE */}

            <div
              ref={message1Ref}
              className="
                message-effect__message
                message-effect__message--1
              "
            >
              <div
                ref={line1Ref}
                className="message-effect__big"
              >
                {firstLine}
              </div>

              <div
                ref={line2Ref}
                className="message-effect__big"
              >
                {secondLine}
              </div>

              <div
                ref={line3Ref}
                className="message-effect__big"
              >
                {thirdLine}
              </div>

              <p
                ref={smallRef}
                className="message-effect__small"
              >
                Vender, preparar,
                despachar, entregar y
                acompañar cada pedido.
                Todo forma parte de la
                experiencia.
              </p>
            </div>

            {/* MENSAJE FINAL */}

            <div
              ref={message2Ref}
              className="
                message-effect__message
                message-effect__message--2
              "
            >
              <div
                ref={finalLine1Ref}
                className="message-effect__big"
              >
                Una buena logística
              </div>

              <div
                ref={finalLine2Ref}
                className="message-effect__big"
              >
                lo hace despegar.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}