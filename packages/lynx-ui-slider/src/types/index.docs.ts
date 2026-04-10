// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { ReactElement, ReactNode } from '@lynx-js/react'

/**
 * Source of a progress update.
 *
 * - `external`: value updated by imperative API calls.
 * - `drag`: value updated by pointer/touch dragging.
 */
export type SliderProgressChangeSource = 'external' | 'drag'

/**
 * Options used by `SliderRef.updateProgress`.
 */
export interface SliderUpdateProgressOptions {
  /**
   * Mark the update source for analytics/logic branching.
   * @defaultValue 'external'
   */
  source?: SliderProgressChangeSource
  /**
   * Bypass drag-time guard and force update even while dragging.
   * @defaultValue false
   */
  force?: boolean
}

/**
 * Imperative methods exposed by `SliderRoot` and `Slider` (facade).
 */
export interface SliderRef {
  /**
   * Imperatively set slider progress in range `[0, 1]`.
   */
  updateProgress: (
    progress: number,
    options?: SliderUpdateProgressOptions,
  ) => void
  /**
   * Read current slider progress in range `[0, 1]`.
   */
  getProgress: () => number
}

/**
 * Root primitive props.
 *
 * `SliderRoot` owns interaction logic (dragging, seeking, and progress
 * tracking) and provides context for child primitives.
 */
export interface SliderRootProps {
  /**
   * Initial progress for uncontrolled usage.
   * @defaultValue 0
   */
  defaultProgress?: number
  /**
   * Disable pointer/touch interaction.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Optional custom guard before interaction updates happen.
   * Return `false` to block interaction.
   */
  canInteract?: () => boolean
  /**
   * Class name for the root container.
   */
  className?: string
  /**
   * Class alias to align with Lynx view conventions.
   */
  class?: string
  /**
   * Inline style for the root container.
   */
  style?: Record<string, unknown>
  /**
   * Whether to block native events at root.
   * @defaultValue true
   */
  blockNativeEvent?: boolean
  /**
   * Triggered when dragging starts or ends.
   */
  onDragging?: (dragging: boolean, progress: number) => void
  /**
   * Triggered on every progress update.
   */
  onProgress?: (progress: number, source: SliderProgressChangeSource) => void
  /**
   * Triggered when user finishes drag/seek interaction.
   */
  onSeek?: (progress: number) => void
  /**
   * Primitive children composition, usually:
   * `SliderTrack` + `SliderRange` + `SliderThumb`.
   */
  children?: ReactNode
}

/**
 * Track primitive props.
 */
export interface SliderTrackProps {
  /**
   * Class name for the background track.
   */
  className?: string
  /**
   * Class alias to align with Lynx view conventions.
   */
  class?: string
  /**
   * Inline style for background track.
   */
  style?: Record<string, unknown>
}

/**
 * Range primitive props.
 *
 * `SliderRange` width and foreground bar are controlled by root progress.
 */
export interface SliderRangeProps {
  /**
   * Class name for the foreground range bar.
   */
  className?: string
  /**
   * Class alias for the foreground range bar.
   */
  class?: string
  /**
   * Inline style for the foreground range bar.
   */
  style?: Record<string, unknown>
  /**
   * Usually includes `SliderThumb` and optional custom range content.
   */
  children?: ReactNode
}

/**
 * Thumb primitive props.
 */
export interface SliderThumbProps {
  /**
   * Class name for the thumb wrapper.
   */
  className?: string
  /**
   * Class alias to align with Lynx view conventions.
   */
  class?: string
  /**
   * Inline style for the thumb wrapper.
   */
  style?: Record<string, unknown>
  /**
   * Custom thumb content.
   */
  children?: ReactNode
}

/**
 * Compatibility facade props for `Slider`.
 *
 * This keeps a single-component API while still composing internal
 * primitives (`SliderRoot/Track/Range/Thumb`).
 */
export interface SliderProps extends Omit<SliderRootProps, 'children'> {
  /**
   * Custom thumb node.
   */
  thumb?: ReactNode

  /**
   * Background track class name.
   */
  trackBackgroundClassName?: string
  /**
   * Background track class alias.
   */
  trackBackgroundClass?: string
  /**
   * Foreground range class name.
   */
  trackForegroundClassName?: string
  /**
   * Foreground range class alias.
   */
  trackForegroundClass?: string
  /**
   * Thumb wrapper class name.
   */
  thumbWrapperClassName?: string
  /**
   * Thumb wrapper class alias.
   */
  thumbWrapperClass?: string
}

export type Slider = (props: SliderProps) => ReactElement
