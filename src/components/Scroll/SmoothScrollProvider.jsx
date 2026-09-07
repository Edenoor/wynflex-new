import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/*
 * =========================================================
 * SMOOTH SCROLL PROVIDER
 * =========================================================
 *
 * Antes, ImmersiveEffect / MessageEffect / FeaturesEffect
 * creaban cada uno su propio `new Lenis(...)`. Funcionaba
 * porque vivían en rutas separadas (una montada a la vez),
 * pero si conviven en una misma página terminarían con
 * varias instancias peleando por el mismo scroll nativo.
 *
 * Este componente centraliza esa instancia: la crea al
 * montarse, la conecta a ScrollTrigger, corre el rAF que
 * la alimenta, y la destruye al desmontarse. Los efectos
 * de adentro ya NO crean ni destruyen Lenis — solo montan
 * sus propios ScrollTrigger/timelines sobre el scroll que
 * este provider deja funcionando.
 *
 * No expone la instancia vía Context a propósito: ningún
 * efecto necesita llamar métodos de Lenis directamente
 * (scrollTo, etc.), solo necesitan que ScrollTrigger vea
 * un scroll suavizado. Si en el futuro algún componente
 * necesita la instancia (por ejemplo, un link que haga
 * `lenis.scrollTo(...)`), ahí sí vale la pena promoverlo
 * a Context — hoy sería abstracción sin uso real.
 *
 * -----------------------------------------------------
 * Configuración elegida (ver informe de refactor):
 *
 *   lerp: 0.08            -> igual en los 3 efectos originales
 *   smoothWheel: true     -> igual en los 3 efectos originales
 *   wheelMultiplier: 0.9  -> presente en MessageEffect y
 *                            FeaturesEffect; ImmersiveEffect
 *                            no lo definía (default 1). Se
 *                            unifica en 0.9 por ser la config
 *                            mayoritaria — la diferencia frente
 *                            a 1 es marginal e imperceptible
 *                            al tacto.
 * -----------------------------------------------------
 */

const LENIS_OPTIONS = {
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 0.9,
}

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS)

    lenis.on('scroll', ScrollTrigger.update)

    let rafId

    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return children
}
