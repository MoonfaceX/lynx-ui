// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// cspell:ignore catchmousemove catchmousedown catchmouseup

import { forwardRef, memo, useImperativeHandle, useRef } from '@lynx-js/react'
import type { ForwardedRef } from '@lynx-js/react'

import type { NodesRef } from '@lynx-js/types'

import { SliderContext } from '../context'
import type {
  SliderProgressChangeSource,
  SliderRef,
  SliderRootProps,
  SliderUpdateProgressOptions,
} from '../types'
import { clamp01, getTouchX, resolveClassName } from '../utils'

export const SliderRoot = memo(forwardRef(SliderRootImpl))

function SliderRootImpl(props: SliderRootProps, ref: ForwardedRef<SliderRef>) {
  const {
    defaultProgress = 0,
    disabled = false,
    canInteract,
    className,
    class: classAttr,
    style,
    blockNativeEvent = true,
    onDragging,
    onProgress,
    onSeek,
    children,
  } = props

  const resolvedClass = resolveClassName(className, classAttr)

  const containerRef = useRef<NodesRef>(null)
  const progressRef = useRef<NodesRef>(null)

  const bgWidth = useRef<number>(0)
  const bgLeft = useRef<number>(0)
  const leftMeasured = useRef<boolean>(false)

  const dragging = useRef<boolean>(false)
  const currentProgress = useRef<number>(clamp01(defaultProgress))

  const updateProgress = (
    progress: number,
    options: SliderUpdateProgressOptions = {},
  ): void => {
    const next = clamp01(progress)
    const source: SliderProgressChangeSource = options.source ?? 'external'

    if (dragging.current && !options.force && source === 'external') {
      return
    }

    currentProgress.current = next
    onProgress?.(next, source)

    progressRef.current
      ?.setNativeProps?.({
        width: `${next * 100}%`,
      })
      ?.exec?.()
  }

  const getProgress = (): number => currentProgress.current

  const measureLeft = (): void => {
    containerRef.current
      ?.invoke?.({
        method: 'boundingClientRect',
        params: { relativeTo: 'screen' },
        success: (res: unknown) => {
          const left = Number(
            (res as { left?: unknown } | null | undefined)?.left,
          )
          if (Number.isFinite(left)) {
            bgLeft.current = left
            leftMeasured.current = true
          }
        },
      })
      ?.exec?.()
  }

  const setDragging = (nextDragging: boolean, progress: number): void => {
    if (dragging.current === nextDragging) return
    dragging.current = nextDragging
    onDragging?.(nextDragging, progress)
  }

  const progressFromX = (x: number): number | null => {
    const width = bgWidth.current
    if (!Number.isFinite(x) || width <= 0) return null
    return clamp01((x - bgLeft.current) / width)
  }

  const handleMoveX = (x: number): void => {
    if (disabled) return
    if (canInteract && !canInteract()) return
    if (bgWidth.current <= 0) return
    if (!leftMeasured.current) {
      // Measure once on first touch to reduce layoutchange miss risk.
      measureLeft()
    }

    const progress = progressFromX(x)
    if (progress === null) return

    setDragging(true, progress)
    updateProgress(progress, { source: 'drag', force: true })
  }

  const handleEnd = (): void => {
    if (disabled) return
    if (canInteract && !canInteract()) return
    if (!dragging.current) return

    const progress = currentProgress.current
    setDragging(false, progress)
    onSeek?.(progress)
  }

  const onLayoutChange = (event: {
    params: { width: number, height: number }
    detail?: { width: number, height: number }
  }): void => {
    const width = Number(event?.detail?.width ?? event?.params?.width)
    if (Number.isFinite(width) && width > 0) {
      bgWidth.current = width
      leftMeasured.current = false
      measureLeft()
      return
    }

    bgWidth.current = 0
    leftMeasured.current = false
  }

  const handleMouseX = (event: unknown): void => {
    const x = Number(
      (event as { clientX?: unknown } | null | undefined)?.clientX,
    )
    handleMoveX(x)
  }

  useImperativeHandle(
    ref,
    () => ({
      updateProgress,
      getProgress,
    }),
    [updateProgress, getProgress],
  )

  const contextValue = {
    progressRef,
    currentProgress,
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <view
        ref={containerRef}
        class={resolvedClass}
        style={style}
        block-native-event={blockNativeEvent}
        catchmousemove={(event: unknown) => handleMouseX(event)}
        catchmousedown={(event: unknown) => handleMouseX(event)}
        catchmouseup={() => handleEnd()}
        catchtouchmove={(event: unknown) => handleMoveX(getTouchX(event))}
        catchtouchstart={(event: unknown) => handleMoveX(getTouchX(event))}
        catchtouchend={() => handleEnd()}
        catchtouchcancel={() => handleEnd()}
        bindlayoutchange={onLayoutChange}
      >
        {children}
      </view>
    </SliderContext.Provider>
  )
}
