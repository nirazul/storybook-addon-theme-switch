import React, { ReactElement, useState } from 'react'
import { Global } from '@storybook/theming'
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components'
import { themeList } from '../config'

const IFRAME_ID = 'storybook-preview-iframe'

const getThemeList = (activeId: string | null, set: (id: string) => void) => themeList.map(({ id, title }) => ({
  id,
  title,
  onClick: () => set(id),
  active: activeId === id,
}))

export function ThemeSwitch(): ReactElement {
  const [themeId, setThemeId] = useState<string | null>(null)

  return (
    <>
      {themeId && (
        <Global
          styles={{
            [`#${IFRAME_ID}`]: {
              content: `${themeId}`,
            },
          }}
        />
      )}
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => {
          const list = getThemeList(themeId, (id) => {
            setThemeId(id)
            onHide()
          })
          return <TooltipLinkList links={list} />
        }}
      >
        <IconButton key="theme" active={!!themeId} title="Theme Switch">
          <Icons icon="mirror" />
        </IconButton>
      </WithTooltip>
    </>
  )
}
