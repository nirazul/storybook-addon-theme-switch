import * as React from 'react'
import addons, { types } from '@storybook/addons'

import { ADDON_ID, PANEL_ID } from './constants'
import { ThemeSwitch } from './components/ThemeSwitch'

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    title: 'Theme Switch',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeSwitch />,
  })
})
