import React, { ReactElement, useState } from 'react'
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components'
import { themeIds, themeList } from '../config'

const getThemeList = (activeId: string | null, set: (id: string) => void) => themeList.map(({ file, id, title }) => ({
  file,
  id,
  title,
  onClick: () => set(id),
  active: activeId === id,
}))

const getCssFile = (themeId: string): ReactElement => {
  const theme = themeList.find(({ id }) => id === themeId)
  if (theme) {
    return (<link rel="stylesheet" href={`./${theme.file}`} />)
  }

  return (<></>)
}

export function ThemeSwitch(): ReactElement {
  const [themeId, setThemeId] = useState<string>(themeIds.THEME_1)

  return (
    <>
      {themeId && getCssFile(themeId)}
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
