// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { defineConfig, type UserConfig } from 'vitest/config'

const config: UserConfig = defineConfig({
  test: {
    name: 'lynx-ui-input-otp',
  },
})

export default config
