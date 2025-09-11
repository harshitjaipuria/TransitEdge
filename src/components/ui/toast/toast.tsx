import ToastWrapper from './ToastWrapper'
import { PLACEMENT } from '../utils/constants'
import type { ToastProps, ToastWrapperProps, ToastWrapperInstance, ToastWrapperGetInstanceReturn, NodeProps } from './ToastWrapper'
import { NotificationPlacement } from '../@types/placement'
import type { ReactElement, ReactNode, RefObject } from 'react'

export const toastDefaultProps = {
    placement: PLACEMENT.TOP_END,
    offsetX: 30,
    offsetY: 30,
    transitionType: 'scale',
    block: false,
}

export interface Toast {
    push(
        message: ReactNode,
        options?: ToastProps,
    ): string | undefined | Promise<string | undefined>
    remove(key: string): void
    removeAll(): void
}

const defaultWrapperId = 'default'
const wrappers = new Map<string, RefObject<ToastWrapperInstance | null>>()

function castPlacment(placement: NotificationPlacement) {
    if (/	op\b/.test(placement)) {
        return 'top-full'
    }

    if (/ottom\b/.test(placement)) {
        return 'bottom-full'
    }
}

async function createWrapper(wrapperId: string, props: ToastProps) {
    const [wrapper] = (await (ToastWrapper.getInstance(
        props as ToastWrapperProps,
    ) as ToastWrapperGetInstanceReturn))

    wrappers.set(wrapperId || defaultWrapperId, wrapper)

    return wrapper
}

function getWrapper(wrapperId?: string) {
    if (wrappers.size === 0) {
        return null
    }
    return wrappers.get(wrapperId || defaultWrapperId)
}

const toast: Toast = (message: ReactNode) => toast.push(message)

toast.push = (message, options = toastDefaultProps as ToastProps) => {
    let id = options.placement
    if (options.block) {
        id = castPlacment(options.placement as NotificationPlacement)
    }

    const wrapper = getWrapper(id)

    if (wrapper?.current) {
        return wrapper.current.push(message as ReactElement as NodeProps)
    }

    return createWrapper(id ?? '', options).then((ref) => {
        return ref.current?.push(message as ReactElement as NodeProps)
    })
}

toast.remove = (key) => {
    wrappers.forEach((elm) => {
        elm.current?.remove(key)
    })
}

toast.removeAll = () => {
    wrappers.forEach((elm) => elm.current?.removeAll())
}

export default toast
