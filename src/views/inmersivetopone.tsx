import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SlowMo } from 'gsap/EasePack'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SlowMo)

const CREAM = '#f3f1eb'
const DARK = '#292727'
const YELLOW = '#f5d84b'
const SHADOW = '#493f13'

const services = [
  {
    number: '01',
    title: 'Flex',
    description: 'Entregas rápidas y trazables en CABA y GBA.',
  },
  {
    number: '02',
    title: 'Turbo',
    description: 'Velocidad para envíos que no pueden esperar.',
  },
  {
    number: '03',
    title: 'Fulfillment',
    description: 'Almacenamiento, preparación y despacho.',
  },
  {
    number: '04',
    title: 'Nacional',
    description: 'Una red para llevar tus envíos más lejos.',
  },
]

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export default function ImmersiveTest() {
  const sectionRef = useRef(null)

  /*
   * OUTER largo de toda la experiencia.
   */
  const containerRef = useRef(null)

  /*
   * INNER fijo de 100vh.
   *
   * Este es el contenedor que realmente debemos usar
   * para medir escena, letras y clipPath.
   */
  const innerRef = useRef(null)

  const rulerRef = useRef(null)

  const maskRef = useRef(null)
  const maskSvgRef = useRef(null)
  const maskOuterRef = useRef(null)
  const maskInnerRef = useRef(null)

  const sceneRef = useRef(null)
  const titleRef = useRef(null)
  const canvasRef = useRef(null)

  useLayoutEffect(() => {
    /*
     * =========================================================
     * STRICT MODE / ASYNC INIT GUARD
     * =========================================================
     *
     * React.StrictMode monta → limpia → monta de nuevo
     * durante desarrollo.
     *
     * Como document.fonts.ready es asíncrono, una instancia vieja
     * puede intentar ejecutar init() después de haber sido destruida.
     *
     * Esta bandera evita eso.
     */
    let disposed = false

    const section = sectionRef.current

    /*
     * OUTER:
     * estructura larga / scroll.
     */
    const outer = containerRef.current

    /*
     * INNER:
     * viewport fijo real.
     *
     * Éste pasa a ser nuestro "container"
     * para replicar la referencia.
     */
    const container = innerRef.current

    const ruler = rulerRef.current
    const scene = sceneRef.current
    const title = titleRef.current
    const canvas = canvasRef.current

    if (
      !section ||
      !outer ||
      !container ||
      !ruler ||
      !scene ||
      !title ||
      !canvas
    ) {
      return
    }

    /*
     * =========================================================
     * LENIS
     * =========================================================
     */

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    let lenisRaf

    const lenisLoop = (time) => {
      if (disposed) return

      lenis.raf(time)

      lenisRaf =
        requestAnimationFrame(
          lenisLoop,
        )
    }

    lenisRaf =
      requestAnimationFrame(
        lenisLoop,
      )

    /*
     * =========================================================
     * STATE
     * =========================================================
     */

    const ctx2d =
      canvas.getContext('2d')

    const mask = {
      width: 0,
      height: 0,
      maxScale: 1,
    }

    const bounding = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    }

    const letters = []
    const points = []

    const animation = {
      animationProgress: 0,
      pointsProgress: 0,
      state: 0,
    }

    const last = {
      animationProgress: -1,
      pointsProgress: -1,
    }

    let speed = 0

    /*
     * =========================================================
     * SCROLL LENGTH
     * =========================================================
     */

    section.style.height =
      `${services.length * 120}lvh`

    /*
     * =========================================================
     * SIZE
     * =========================================================
     */

    const setSize = () => {
      const rect =
        container.getBoundingClientRect()

      bounding.left =
        rect.left

      bounding.top =
        rect.top

      bounding.width =
        window.innerWidth

      bounding.height =
        window.innerHeight

      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2,
        )

      canvas.width =
        bounding.width * dpr

      canvas.height =
        bounding.height * dpr

      canvas.style.width =
        `${bounding.width}px`

      canvas.style.height =
        `${bounding.height}px`

      ctx2d.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      )

      ctx2d.strokeStyle =
        YELLOW

      speed =
        Math.hypot(
          bounding.width,
          bounding.height,
        ) * 4
    }

    /*
     * =========================================================
     * SVG MASK
     * =========================================================
     */

    const setMask = () => {
      const width =
        window.innerWidth

      const height =
        window.innerHeight

      mask.width = width
      mask.height = height

      maskSvgRef.current.setAttribute(
        'viewBox',
        `0 0 ${width} ${height}`,
      )

      const sectionRect =
        section.getBoundingClientRect()

      const rulerRect =
        ruler.getBoundingClientRect()

      const rw =
        rulerRect.width

      const rh =
        rulerRect.height

      const left =
        rulerRect.left -
        sectionRect.left

      const top =
        rulerRect.top

      const corners = {
        tl: {
          x: left,
          y: top,
        },

        tr: {
          x: left + rw,
          y: top,
        },

        br: {
          x: left + rw,
          y: top + rh,
        },

        bl: {
          x: left,
          y: top + rh,
        },
      }

      const outerRect = `
        M -1 0
        L ${width + 2} 0
        L ${width + 2} ${height}
        L -1 ${height}
        Z
      `

      let radius =
        (
          corners.tr.x -
          corners.tl.x
        ) / 2

      mask.maxScale =
        window.innerWidth /
        radius

      /*
       * PORTAL EXTERIOR
       */

      let capsule = `
        M
          ${corners.tl.x}
          ${corners.tl.y + radius}

        A
          ${radius}
          ${radius}
          0 0 1
          ${corners.tr.x}
          ${corners.tr.y + radius}

        L
          ${corners.br.x}
          ${corners.br.y - radius}

        A
          ${radius}
          ${radius}
          0 0 1
          ${corners.bl.x}
          ${corners.bl.y - radius}

        Z
      `

      maskOuterRef.current.setAttribute(
        'd',
        `${outerRect} ${capsule}`,
      )

      /*
       * PORTAL INTERIOR
       */

      const gap =
        window.innerWidth > 767
          ? 16
          : 8

      corners.tl.x += gap
      corners.tl.y += gap

      corners.tr.x -= gap
      corners.tr.y += gap

      corners.br.x -= gap
      corners.br.y -= gap

      corners.bl.x += gap
      corners.bl.y -= gap

      radius =
        (
          corners.tr.x -
          corners.tl.x
        ) / 2

      capsule = `
        M
          ${corners.tl.x}
          ${corners.tl.y + radius}

        A
          ${radius}
          ${radius}
          0 0 1
          ${corners.tr.x}
          ${corners.tr.y + radius}

        L
          ${corners.br.x}
          ${corners.br.y - radius}

        A
          ${radius}
          ${radius}
          0 0 1
          ${corners.bl.x}
          ${corners.bl.y - radius}

        Z
      `

      maskInnerRef.current.setAttribute(
        'd',
        `${outerRect} ${capsule}`,
      )
    }

    /*
     * =========================================================
     * LETTERS
     * =========================================================
     */

    const clearLetters = () => {
      letters.forEach(
        (letter) => {
          letter.ghosts.forEach(
            (ghost) => {
              ghost.el.remove()
            },
          )
        },
      )

      letters.length = 0
    }

    const setLetters = () => {
      clearLetters()

      const originalLetters =
        title.querySelectorAll(
          '.wyn-original-letter',
        )

      const containerRect =
        container.getBoundingClientRect()

      originalLetters.forEach(
        (
          original,
          letterIndex,
        ) => {
          const letter = {
            el: original,
            ghosts: [],
          }

          const rect =
            original.getBoundingClientRect()

          letter.width =
            rect.width

          letter.height =
            rect.height

          letter.top =
            rect.top -
            containerRect.top

          letter.left =
            rect.left -
            containerRect.left

          letter.freq =
            1 + Math.random()

          const density =
            window.innerWidth > 767
              ? 0.75
              : 0.5

          letter.total =
            Math.round(
              (
                bounding.width /
                letter.width
              ) *
                density,
            ) + 2

          for (
            let i = 0;
            i < letter.total;
            i += 1
          ) {
            const ghost =
              document.createElement(
                'span',
              )

            ghost.className =
              'wyn-scene-letter'

            ghost.innerText =
              original.innerText

            ghost.dataset.letter =
              original.innerText

            scene.appendChild(
              ghost,
            )

            const normalized =
              (
                i /
                  letter.total -
                0.5
              ) * 2

            const absolute =
              Math.abs(
                i /
                  letter.total -
                  0.5,
              ) * 2

            const ghostData = {
              el: ghost,

              i:
                i -
                letter.total *
                  0.5,

              p:
                normalized,

              ap:
                absolute,
            }

            ghost.style.top =
              `${letter.top}px`

            ghost.style.left =
              `${letter.left}px`

            ghost.style.zIndex =
              String(
                letterIndex !== 1 &&
                  letterIndex !== 2 &&
                  (
                    letterIndex +
                    originalLetters.length +
                    i
                  ) %
                    5 ===
                    0
                  ? 3
                  : 1,
              )

            ghost.style.setProperty(
              '--ix',
              String(
                ghostData.i,
              ),
            )

            ghost.style.setProperty(
              '--iy',
              String(
                (
                  (
                    letterIndex +
                    1
                  ) /
                    (
                      originalLetters.length +
                      1
                    ) -
                  0.5
                ) *
                  2,
              ),
            )

            ghost.style.setProperty(
              '--ap',
              String(
                ghostData.ap,
              ),
            )

            ghost.style.setProperty(
              '--p',
              String(
                ghostData.p,
              ),
            )

            ghost.style.setProperty(
              '--progress',
              '0.5',
            )

            letter.ghosts.push(
              ghostData,
            )
          }

          letters.push(
            letter,
          )
        },
      )
    }

    /*
     * =========================================================
     * SERVICES
     * =========================================================
     */

    const setWorks = () => {
      const workEls =
        scene.querySelectorAll(
          '.wyn-service-card',
        )

      workEls.forEach(
        (
          work,
          index,
        ) => {
          work.style.setProperty(
            '--size',
            String(
              0.5 +
                Math.random() *
                  0.5,
            ),
          )

          work.style.setProperty(
            '--y',
            String(
              (
                0.5 +
                Math.random() *
                  0.5
              ) *
                (
                  index % 2
                    ? -1
                    : 1
                ),
            ),
          )

          work.style.setProperty(
            '--progress',
            '1',
          )
        },
      )
    }

    /*
     * =========================================================
     * CANVAS
     * =========================================================
     */

    const setPoints = () => {
      points.length = 0

      const gap = 24

      const columns =
        Math.ceil(
          (
            bounding.width *
            1.2
          ) /
            gap,
        )

      const rows =
        Math.ceil(
          (
            bounding.height *
            1.2
          ) /
            gap,
        )

      const offsetX =
        (
          bounding.width -
          columns * gap
        ) * 0.5

      const offsetY =
        (
          bounding.height -
          rows * gap
        ) * 0.5

      const centerX =
        bounding.width *
        0.5

      const centerY =
        bounding.height *
        0.5

      for (
        let x = 0;
        x < columns;
        x += 1
      ) {
        for (
          let y = 0;
          y < rows;
          y += 1
        ) {
          const px =
            x * gap +
            offsetX

          const py =
            y * gap +
            offsetY

          points.push({
            x: px,
            y: py,

            dx:
              centerX -
              px,

            dy:
              centerY -
              py,

            flowX: 0,
          })
        }
      }
    }

    const movePoints = () => {
      points.forEach(
        (point) => {
          point.flowX =
            (
              animation.animationProgress *
              -0.05
            ) %
            24
        },
      )
    }

    const drawPoints = () => {
      const animationRounded =
        Math.round(
          animation.animationProgress *
            100,
        ) / 100

      const pointsRounded =
        Math.round(
          animation.pointsProgress *
            100,
        ) / 100

      if (
        animationRounded ===
          last.animationProgress &&
        pointsRounded ===
          last.pointsProgress
      ) {
        return
      }

      ctx2d.clearRect(
        0,
        0,
        bounding.width,
        bounding.height,
      )

      ctx2d.beginPath()

      points.forEach(
        (point) => {
          const x =
            point.x +
            point.dx *
              (
                1 -
                animation.pointsProgress
              ) *
              0.2 +
            point.flowX

          const y =
            point.y +
            point.dy *
              (
                1 -
                animation.pointsProgress
              ) *
              0.2

          ctx2d.rect(
            x,
            y,
            0.5,
            0.5,
          )
        },
      )

      ctx2d.stroke()

      last.animationProgress =
        animationRounded

      last.pointsProgress =
        pointsRounded
    }

    /*
     * =========================================================
     * LETTER FLOW
     * =========================================================
     */

    const moveLetters = () => {
      letters.forEach(
        (letter) => {
          const duration =
            speed *
            letter.freq

          letter.ghosts.forEach(
            (
              ghost,
              index,
            ) => {
              const progress =
                (
                  (
                    animation.animationProgress %
                    duration
                  ) /
                    duration +
                  index /
                    letter.total
                ) %
                  1 /
                  0.7 -
                0.15

              ghost.el.style.setProperty(
                '--progress',
                String(
                  progress,
                ),
              )
            },
          )
        },
      )
    }

    /*
     * =========================================================
     * SCROLL PROGRESS
     * =========================================================
     */

    const updateScrollProgress = () => {
      const rect =
        section.getBoundingClientRect()

      const viewportHeight =
        window.innerHeight

      const topPosition =
        rect.top /
        viewportHeight

      const bottomPosition =
        rect.bottom /
        viewportHeight

      const scrollProgress =
        clamp(
          topPosition,
          0,
          1,
        ) *
          -1 +
        (
          1 -
          clamp(
            bottomPosition,
            0,
            1,
          )
        )

      section.style.setProperty(
        '--scroll-progress',
        String(
          scrollProgress,
        ),
      )
    }

    /*
     * =========================================================
     * VISUAL LOOP
     * =========================================================
     */

    let visualRaf

    const visualLoop = () => {
      if (disposed) return

      updateScrollProgress()

      movePoints()
      moveLetters()
      drawPoints()

      visualRaf =
        requestAnimationFrame(
          visualLoop,
        )
    }

    /*
     * =========================================================
     * TIMELINE
     * =========================================================
     */

    let timeline

    const buildTimeline = () => {
      timeline?.scrollTrigger?.kill()
      timeline?.kill()

      const works =
        scene.querySelectorAll(
          '.wyn-service-card',
        )

      timeline =
        gsap.timeline({
          scrollTrigger: {
            trigger: section,

            start:
              'top 25%',

            end:
              'bottom 75%',

            scrub: 1,

            invalidateOnRefresh:
              true,
          },

          onUpdate: () => {
            scene.style.setProperty(
              '--state',
              String(
                animation.state,
              ),
            )
          },
        })

      timeline.fromTo(
        maskRef.current,
        {
          scale: 1,
        },
        {
          scale:
            mask.maxScale,

          duration: 0.75,

          ease:
            'power4.in',
        },
        0,
      )

      timeline.fromTo(
        scene,
        {
          scale: 0.75,
        },
        {
          scale: 1,

          duration: 0.75,

          ease:
            'power3.in',
        },
        0,
      )

      timeline.fromTo(
        container,
        {
          clipPath:
            'inset(0 1rem)',
        },
        {
          clipPath:
            'inset(0 0rem)',

          duration: 0.75,

          ease:
            'power3.in',
        },
        0,
      )

      timeline.fromTo(
        animation,
        {
          pointsProgress: 0,
        },
        {
          pointsProgress: 1,

          duration: 1,

          ease:
            'power4.inOut',
        },
        0,
      )

      timeline.fromTo(
        animation,
        {
          state: 0,
        },
        {
          state: 1,

          duration: 0.75,

          ease:
            'power4.in',
        },
        0,
      )

      timeline.fromTo(
        works,
        {
          '--progress': 1,
        },
        {
          '--progress': -1,

          ease:
            SlowMo.config(
              0.15,
              0.6,
              false,
            ),

          stagger:
            0.25,
        },
        0.75,
      )

      timeline.fromTo(
        animation,
        {
          animationProgress:
            0,
        },
        {
          animationProgress:
            10000,

          duration:
            timeline.totalDuration(),

          ease:
            'power1.out',
        },
        0.75,
      )

      timeline.fromTo(
        animation,
        {
          state: 1,
        },
        {
          state: 0,

          duration: 0.75,

          ease:
            'power4.inOut',

          immediateRender:
            false,
        },
        '-=1',
      )

      timeline.fromTo(
        maskRef.current,
        {
          scale:
            mask.maxScale,
        },
        {
          scale: 1,

          duration: 0.75,

          ease:
            'power4.inOut',

          immediateRender:
            false,
        },
        '-=1',
      )

      timeline.fromTo(
        scene,
        {
          scale: 1,
        },
        {
          scale: 0.75,

          duration: 0.75,

          ease:
            'power3.inOut',

          immediateRender:
            false,
        },
        '-=1',
      )

      timeline.fromTo(
        container,
        {
          clipPath:
            'inset(0 0rem)',
        },
        {
          clipPath:
            'inset(0 1rem)',

          duration: 0.75,

          ease:
            'power3.inOut',

          immediateRender:
            false,
        },
        '-=1',
      )

      timeline.fromTo(
        animation,
        {
          pointsProgress: 1,
        },
        {
          pointsProgress: 0,

          duration: 1,

          ease:
            'power4.inOut',
        },
        '-=1',
      )
    }

    /*
     * =========================================================
     * INIT
     * =========================================================
     */

    const init = () => {
      /*
       * Si esta instancia del efecto ya murió,
       * no hacemos absolutamente nada.
       */
      if (disposed) return

      /*
       * Protección extra:
       * si por cualquier razón init() volviera a dispararse
       * dentro de la misma instancia, primero eliminamos ghosts.
       */
      clearLetters()

      setSize()

      setMask()

      setPoints()

      setLetters()

      setWorks()

      buildTimeline()

      visualRaf =
        requestAnimationFrame(
          visualLoop,
        )

      ScrollTrigger.refresh()
    }

    /*
     * No llamamos init directamente desde fonts.ready.
     * Lo envolvemos para asegurarnos de que el efecto
     * siga vivo.
     */
    const safeInit = () => {
      if (disposed) return

      init()
    }

    if (
      document.fonts?.ready
    ) {
      document.fonts.ready.then(
        safeInit,
      )
    } else {
      safeInit()
    }

    /*
     * =========================================================
     * RESIZE
     * =========================================================
     */

    let resizeTimeout

    const resize = () => {
      clearTimeout(
        resizeTimeout,
      )

      resizeTimeout =
        setTimeout(() => {
          if (disposed) return

          setSize()

          setMask()

          setPoints()

          setLetters()

          setWorks()

          buildTimeline()

          ScrollTrigger.refresh()
        }, 120)
    }

    window.addEventListener(
      'resize',
      resize,
    )

    /*
     * =========================================================
     * CLEANUP
     * =========================================================
     */

    return () => {
      /*
       * CLAVE DEL FIX:
       * cualquier promesa/RAF pendiente sabe desde acá
       * que esta instancia ya murió.
       */
      disposed = true

      clearTimeout(
        resizeTimeout,
      )

      window.removeEventListener(
        'resize',
        resize,
      )

      cancelAnimationFrame(
        visualRaf,
      )

      cancelAnimationFrame(
        lenisRaf,
      )

      timeline?.scrollTrigger?.kill()
      timeline?.kill()

      clearLetters()

      lenis.destroy()
    }
  }, [])

  return (
    <>
      <style>
        {`
          :root {
            --wyn-cream: ${CREAM};
            --wyn-dark: ${DARK};
            --wyn-yellow: ${YELLOW};
            --wyn-shadow: ${SHADOW};
          }

          .wyn-immersive-page {
            margin: 0;

            background:
              var(--wyn-cream);

            color:
              var(--wyn-dark);
          }

          /* ================================================
             INTRO
          ================================================= */

          .wyn-intro {
            min-height: 100vh;

            display: flex;

            align-items:
              flex-end;

            padding: 7vw;

            background:
              var(--wyn-cream);
          }

          .wyn-intro__eyebrow {
            margin: 0;

            font-size: 11px;

            letter-spacing:
              .22em;

            text-transform:
              uppercase;

            opacity: .45;
          }

          .wyn-intro__title {
            margin:
              20px 0 0;

            font-size:
              clamp(
                64px,
                10vw,
                150px
              );

            line-height:
              .86;

            letter-spacing:
              -.065em;

            font-weight:
              700;
          }

          /* ================================================
             WORK
          ================================================= */

          .wyn-work {
            --scroll-progress: 0;

            position:
              relative;

            z-index: 2;

            background:
              var(--wyn-cream);
          }

          /* ================================================
             MASK
          ================================================= */

          .wyn-mask-outer {
            position:
              sticky;

            top: 0;

            left: 0;

            z-index: 20;

            width: 100%;

            height: 100lvh;

            overflow:
              hidden;

            pointer-events:
              none;
          }

          .wyn-mask {
            position:
              absolute;

            inset: 0;

            width: 100%;

            height: 100%;

            transform-origin:
              center center;

            will-change:
              transform;
          }

          .wyn-mask svg {
            position:
              absolute;

            inset: 0;

            width: 100%;

            height: 100%;
          }

          .wyn-mask__outer {
            fill:
              var(--wyn-cream);

            fill-rule:
              evenodd;

            stroke:
              rgba(
                41,
                39,
                39,
                .55
              );

            stroke-width:
              1px;
          }

          .wyn-mask__inner {
            fill:
              var(--wyn-cream);

            fill-rule:
              evenodd;

            stroke:
              rgba(
                41,
                39,
                39,
                .35
              );

            stroke-width:
              1px;

            transform:
              translate3d(
                0,

                calc(
                  var(--scroll-progress) *
                  48px
                ),

                0
              );

            will-change:
              transform;
          }

          /* ================================================
             OUTER
          ================================================= */

          .wyn-work__outer {
            position:
              absolute;

            top: 0;

            left: 0;

            width: 100%;

            height: 100%;

            clip-path:
              inset(0 -1rem);
          }

          /* ================================================
             INNER
          ================================================= */

          .wyn-work__inner {
            position:
              fixed;

            top: 0;

            left: 0;

            width: 100%;

            height: 100%;

            display: flex;

            align-items:
              center;

            justify-content:
              center;

            overflow:
              hidden;

            background:
              var(--wyn-dark);

            color:
              var(--wyn-yellow);

            transform:
              translate3d(
                0,

                calc(
                  var(--scroll-progress) *
                  -15%
                ),

                0
              );

            will-change:
              clip-path,
              transform;
          }

          /* ================================================
             RULER
          ================================================= */

          .wyn-work__ruler {
            --width:
              min(
                16.6667%,
                19.625rem
              );

            position:
              absolute;

            top: 10lvh;

            left:
              calc(
                50% -
                var(--width) /
                2
              );

            width:
              var(--width);

            height:
              80lvh;

            opacity:
              0;

            pointer-events:
              none;
          }

          /* ================================================
             TYPOGRAPHY SOURCE
          ================================================= */

          .wyn-title,
          .wyn-scene {
            font-size:
              min(
                18.75rem,
                25lvh
              );

            font-weight:
              900;

            line-height:
              1;

            text-align:
              center;

            text-transform:
              uppercase;
          }

          .wyn-title {
            width:
              .7em;

            opacity:
              0;

            word-break:
              break-all;

            pointer-events:
              none;
          }

          .wyn-title__inner {
            display:
              flex;

            flex-direction:
              column;

            align-items:
              center;

            justify-content:
              center;

            margin:
              .075em
              0
              -.125em;
          }

          .wyn-original-letter,
          .wyn-scene-letter {
            line-height:
              .85;
          }

          /* ================================================
             SCENE
          ================================================= */

          .wyn-scene {
            --state: 0;

            position:
              absolute;

            inset: 0;

            z-index: 2;

            width: 100%;

            height: 100%;

            perspective:
              40rem;

            transform-origin:
              center center;

            will-change:
              transform;
          }

          /* ================================================
             LETTER ENGINE
          ================================================= */

          .wyn-scene-letter {
            --progress:
              .5;

            --head:
              calc(
                (
                  var(--progress) -
                  .5
                ) *
                -2
              );

            --ahead:
              calc(
                var(--head) *
                var(--head)
              );

            position:
              absolute;

            display:
              block;

            color:
              var(--wyn-yellow);

            transform:
              rotateY(
                calc(
                  var(--head) *
                  -10deg *
                  var(--state)
                )
              )

              translate3d(
                calc(
                  var(--head) *
                  50vw *
                  var(--state)
                ),

                calc(
                  var(--iy) *
                  50% *
                  var(--ahead) *
                  var(--state)
                ),

                0
              );

            pointer-events:
              none;

            will-change:
              transform;
          }

          .wyn-scene-letter::before {
            position:
              absolute;

            top: 0;

            left: 0;

            z-index:
              -1;

            color:
              var(--wyn-shadow);

            opacity:
              min(
                var(--state) *
                2,
                1
              );

            transform:
              scale(
                1.05,
                1.02
              )

              translate3d(
                calc(
                  var(--head) *
                  .1rem *
                  var(--state) *
                  var(--state)
                ),

                0,
                0
              );

            transform-origin:
              calc(
                50% -
                var(--head) *
                50%
              )
              -50%;

            content:
              attr(
                data-letter
              );

            will-change:
              opacity,
              transform;
          }

          /* ================================================
             CARDS
          ================================================= */

          .wyn-service-card {
            --progress: 1;
            --size: .75;
            --y: 1;

            position:
              absolute;

            top:
              50%;

            left:
              50%;

            z-index:
              2;

            display:
              block;

            padding:
              .5rem
              .5rem
              0;

            background:
              var(--wyn-yellow);

            color:
              var(--wyn-dark);

            transform-style:
              preserve-3d;

            transform:
              rotateY(
                calc(
                  var(--progress) *
                  -20deg
                )
              )

              translate3d(
                calc(
                  var(--progress) *
                  (
                    50vw +
                    100%
                  ) -
                  50%
                ),

                calc(
                  var(--y) *
                  50% -
                  50%
                ),

                calc(
                  var(--progress) *
                  var(--progress) *
                  -5rem
                )
              )

              scale(
                var(--size)
              );

            will-change:
              transform;
          }

          .wyn-service-card__visual {
            width:
              min(
                46vw,
                620px
              );

            aspect-ratio:
              16 / 10;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            overflow:
              hidden;

            background:
              var(--wyn-dark);

            color:
              var(--wyn-yellow);

            font-size:
              clamp(
                70px,
                10vw,
                150px
              );

            font-weight:
              900;

            letter-spacing:
              -.08em;
          }

          .wyn-service-card__caption {
            display:
              flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap:
              2rem;

            padding:
              .75rem;

            font-size:
              11px;

            font-weight:
              700;

            letter-spacing:
              .12em;

            text-transform:
              uppercase;
          }

          .wyn-service-card__number {
            opacity:
              .55;
          }

          /* ================================================
             CANVAS
          ================================================= */

          .wyn-canvas {
            position:
              absolute;

            inset: 0;

            z-index:
              1;

            width:
              100%;

            height:
              100%;

            transform:
              translate3d(
                0,

                calc(
                  var(--scroll-progress) *
                  -5%
                ),

                0
              );

            pointer-events:
              none;
          }

          /* ================================================
             EXIT
          ================================================= */

          .wyn-exit {
            min-height:
              100vh;

            display:
              flex;

            align-items:
              center;

            padding:
              7vw;

            background:
              var(--wyn-cream);

            color:
              var(--wyn-dark);
          }

          .wyn-exit h2 {
            margin:
              0;

            font-size:
              clamp(
                60px,
                9vw,
                140px
              );

            line-height:
              .88;

            letter-spacing:
              -.06em;

            font-weight:
              700;
          }

          /* ================================================
             RESPONSIVE
          ================================================= */

          @media (
            max-width:
            987px
          ) {
            .wyn-work__ruler {
              --width:
                33.3333%;
            }

            .wyn-service-card__visual {
              width:
                min(
                  70vw,
                  620px
                );
            }
          }

          @media (
            max-width:
            576px
          ) {
            .wyn-work__ruler {
              --width:
                50%;
            }

            .wyn-work__inner,
            .wyn-canvas {
              transform:
                none;
            }

            .wyn-service-card {
              padding:
                .25rem;

              transform:
                rotateY(
                  calc(
                    var(--progress) *
                    -20deg
                  )
                )

                translate3d(
                  calc(
                    var(--progress) *
                    (
                      50vw +
                      100%
                    ) -
                    50%
                  ),

                  calc(
                    var(--y) *
                    100% -
                    50%
                  ),

                  calc(
                    var(--progress) *
                    var(--progress) *
                    -5rem
                  )
                );
            }

            .wyn-service-card__visual {
              width:
                78vw;
            }

            .wyn-service-card__caption {
              display:
                none;
            }
          }
        `}
      </style>

      <main className="wyn-immersive-page">
        <section className="wyn-intro">
          <div>
            <p className="wyn-intro__eyebrow">
              Wynflex
            </p>

            <h1 className="wyn-intro__title">
              Quiénes
              <br />
              somos.
            </h1>
          </div>
        </section>

        <section
          ref={sectionRef}
          className="wyn-work"
        >
          <div className="wyn-mask-outer">
            <div
              ref={maskRef}
              className="wyn-mask"
            >
              <svg
                ref={maskSvgRef}
                aria-hidden="true"
              >
                <path
                  ref={maskOuterRef}
                  className="wyn-mask__outer"
                />

                <path
                  ref={maskInnerRef}
                  className="wyn-mask__inner"
                />
              </svg>
            </div>
          </div>

          <div
            ref={containerRef}
            className="wyn-work__outer"
          >
            <div
              ref={innerRef}
              className="wyn-work__inner"
            >
              <div
                ref={rulerRef}
                className="wyn-work__ruler"
              />

              <div
                ref={titleRef}
                className="wyn-title"
              >
                <div className="wyn-title__inner">
                  <span className="wyn-original-letter">
                    W
                  </span>

                  <span className="wyn-original-letter">
                    Y
                  </span>

                  <span className="wyn-original-letter">
                    N
                  </span>
                </div>
              </div>

              <canvas
                ref={canvasRef}
                className="wyn-canvas"
              />

              <div
                ref={sceneRef}
                className="wyn-scene"
              >
                {services.map(
                  (service) => (
                    <article
                      key={service.number}
                      className="wyn-service-card"
                    >
                      <div className="wyn-service-card__visual">
                        {service.title
                          .slice(0, 1)
                          .toUpperCase()}
                      </div>

                      <div className="wyn-service-card__caption">
                        <span>
                          {service.title}
                        </span>

                        <span className="wyn-service-card__number">
                          {service.number}
                        </span>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="wyn-exit">
          <h2>
            Movemos
            <br />
            lo que viene.
          </h2>
        </section>
      </main>
    </>
  )
}