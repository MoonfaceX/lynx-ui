// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { CSSProperties } from '@lynx-js/types'

export function getBounceWrapperStyle(
  style: CSSProperties | undefined,
  horizontal: boolean,
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: horizontal ? '100%' : style?.height,
    width: horizontal ? style?.width : '100%',
    borderRadius: style?.borderRadius,
    borderTopLeftRadius: style?.borderTopLeftRadius,
    borderTopRightRadius: style?.borderTopRightRadius,
    borderBottomLeftRadius: style?.borderBottomLeftRadius,
    borderBottomRightRadius: style?.borderBottomRightRadius,
    borderStartStartRadius: style?.borderStartStartRadius,
    borderStartEndRadius: style?.borderStartEndRadius,
    borderEndStartRadius: style?.borderEndStartRadius,
    borderEndEndRadius: style?.borderEndEndRadius,
  }
}
