import React, { memo } from 'react'
import './tag.scss'
interface IProps {
  tags: string[],
  tag: string,
  setTag: Function
}

const Tag = memo((props: IProps) => {
  const { tags, tag, setTag } = props
  return (
    <ul className="address-tags">
      {tags.map((t: string) => (
        <li
          className={`address-tag ${tag === t ? 'tag-selected' : ''}`}
          onClick={() => setTag(t)}
          key={t}>{t}

        </li>
      ))}
    </ul>
  )
})

export default Tag