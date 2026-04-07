<script setup lang="ts">
interface Particle {
    x: number
    y: number
    size: number
    opacity: number
    translateX: number
    translateY: number
}

interface RgbColor {
    r: number
    g: number
    b: number
}

const props = withDefaults(defineProps<{
    color?: string
    quantity?: number
    staticity?: number
    ease?: number
}>(), {
    color: '#FFF',
    quantity: 100,
    staticity: 50,
    ease: 50
})

const wrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const particles = ref<Particle[]>([])

const pointer = ref<{ x: number, y: number, active: boolean }>({
    x: 0,
    y: 0,
    active: false
})

let animationFrame = 0
let resizeObserver: ResizeObserver | null = null

function parseHexColor(hex: string): RgbColor {
    const normalized = hex.trim().replace('#', '')
    if (!/^[\da-fA-F]{3}$|^[\da-fA-F]{6}$/.test(normalized)) {
        return { r: 255, g: 255, b: 255 }
    }

    const expanded = normalized.length === 3
        ? normalized.split('').map(char => `${char}${char}`).join('')
        : normalized

    return {
        r: Number.parseInt(expanded.slice(0, 2), 16),
        g: Number.parseInt(expanded.slice(2, 4), 16),
        b: Number.parseInt(expanded.slice(4, 6), 16)
    }
}

function getCanvasContext(): CanvasRenderingContext2D | null {
    if (!(canvasRef.value instanceof HTMLCanvasElement)) {
        return null
    }

    return canvasRef.value.getContext('2d')
}

function resetCanvasSize(): void {
    if (!(wrapperRef.value instanceof HTMLElement) || !(canvasRef.value instanceof HTMLCanvasElement)) {
        return
    }

    const width = wrapperRef.value.offsetWidth
    const height = wrapperRef.value.offsetHeight
    const ratio = window.devicePixelRatio || 1

    canvasRef.value.width = Math.max(1, Math.floor(width * ratio))
    canvasRef.value.height = Math.max(1, Math.floor(height * ratio))
    canvasRef.value.style.width = `${width}px`
    canvasRef.value.style.height = `${height}px`

    const context = getCanvasContext()
    if (context !== null) {
        context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
}

function random(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

function createParticles(): void {
    if (!(wrapperRef.value instanceof HTMLElement)) {
        return
    }

    const width = wrapperRef.value.offsetWidth
    const height = wrapperRef.value.offsetHeight
    const list: Particle[] = []

    for (let index = 0; index < props.quantity; index += 1) {
        list.push({
            x: random(0, width),
            y: random(0, height),
            size: random(0.6, 2.4),
            opacity: random(0.15, 0.9),
            translateX: 0,
            translateY: 0
        })
    }

    particles.value = list
}

function draw(): void {
    const context = getCanvasContext()
    if (context === null || !(wrapperRef.value instanceof HTMLElement)) {
        return
    }

    const width = wrapperRef.value.offsetWidth
    const height = wrapperRef.value.offsetHeight
    const rgb = parseHexColor(props.color)
    const interactionRadius = Math.min(220, Math.max(120, Math.min(width, height) * 0.28))

    context.clearRect(0, 0, width, height)

    for (const particle of particles.value) {
        let targetX = 0
        let targetY = 0

        if (pointer.value.active) {
            const dx = pointer.value.x - particle.x
            const dy = pointer.value.y - particle.y
            const distance = Math.sqrt((dx * dx) + (dy * dy))

            if (distance < interactionRadius && distance > 0) {
                const strength = (interactionRadius - distance) / interactionRadius
                targetX = (dx / props.staticity) * strength * 18
                targetY = (dy / props.staticity) * strength * 18
            }
        }

        particle.translateX += (targetX - particle.translateX) / props.ease
        particle.translateY += (targetY - particle.translateY) / props.ease

        context.beginPath()
        context.arc(
            particle.x + particle.translateX,
            particle.y + particle.translateY,
            particle.size,
            0,
            Math.PI * 2
        )
        context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`
        context.fill()
    }
}

function animate(): void {
    draw()
    animationFrame = window.requestAnimationFrame(animate)
}

function onPointerMove(event: PointerEvent): void {
    if (!(wrapperRef.value instanceof HTMLElement)) {
        return
    }

    const rect = wrapperRef.value.getBoundingClientRect()
    pointer.value.x = event.clientX - rect.left
    pointer.value.y = event.clientY - rect.top
    pointer.value.active = true
}

function onPointerLeave(): void {
    pointer.value.active = false
}

function rebuildScene(): void {
    resetCanvasSize()
    createParticles()
}

onMounted(() => {
    if (!(wrapperRef.value instanceof HTMLElement)) {
        return
    }

    rebuildScene()
    animate()
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    resizeObserver = new ResizeObserver(() => {
        rebuildScene()
    })
    resizeObserver.observe(wrapperRef.value)
})

onBeforeUnmount(() => {
    window.cancelAnimationFrame(animationFrame)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', onPointerLeave)
    if (resizeObserver !== null) {
        resizeObserver.disconnect()
        resizeObserver = null
    }
})

watch(() => [props.quantity, props.staticity, props.ease, props.color], () => {
    if (process.client) {
        rebuildScene()
    }
})
</script>

<template>
    <div
        ref="wrapperRef"
        class="absolute inset-0 pointer-events-none"
    >
        <canvas
            ref="canvasRef"
            class="absolute inset-0 h-full w-full"
        />
    </div>
</template>
