import React, { memo } from 'react'
import './ske.scss'
interface IProps {
  show: boolean 
}
const Skeleton = memo((props: IProps) => {
  const { show } = props 
  return (
    <div className={`ske ${show ? '' : 'hidden'}`}>
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNzUgNjAzIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yKSI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTIgNjloMzc1djUzNEgyeiIvPjxwYXRoIGZpbGw9IiNFRUUiIGQ9Ik0yIDBoMzc1djY5SDJ6Ii8+PHJlY3Qgd2lkdGg9IjY2IiBoZWlnaHQ9IjY2IiB4PSIxNTciIHk9IjIzIiBmaWxsPSIjRjZGNkY2IiByeD0iMiIvPjxwYXRoIGZpbGw9IiNFRUUiIGQ9Ik02NSA5OWgyNTB2MjRINjV6bTAgMzFoMjUwdjEzSDY1eiIvPjxwYXRoIGZpbGw9IiNGNkY2RjYiIGQ9Ik02NSAxNTBoMjUwdjEzSDY1ek0yIDMwMGg3N3YzMDNIMnoiLz48cGF0aCBzdHJva2U9IiNGNkY2RjYiIGQ9Ik0yNi41IDE3Mi41aDMyNnYyOGgtMzI2eiIvPjxwYXRoIGZpbGw9IiNFRUUiIGQ9Ik01MCAxODBoMjgwdjEzSDUweiIvPjxwYXRoIHN0cm9rZT0iI0Y2RjZGNiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgZD0iTS41IDI0OC41aDM3OS4wMDUiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OCAyNzgpIj48cGF0aCBmaWxsPSIjRUVFIiBkPSJNMjY3IDgydi0zLjk5OGEuOTk5Ljk5OSAwIDEgMC0yIDBWODJoLTMuOTk4YS45OTkuOTk5IDAgMSAwIDAgMkgyNjV2My45OThhLjk5OS45OTkgMCAxIDAgMiAwVjg0aDMuOTk4YS45OTkuOTk5IDAgMSAwIDAtMkgyNjd6bS0xIDEyYy02LjA3NSAwLTExLTQuOTI1LTExLTExczQuOTI1LTExIDExLTExIDExIDQuOTI1IDExIDExLTQuOTI1IDExLTExIDExeiIvPjxyZWN0IHdpZHRoPSI3NCIgaGVpZ2h0PSI3NCIgeD0iMSIgeT0iMTMiIGZpbGw9IiNGNkY2RjYiIHJ4PSIyIi8+PHBhdGggZmlsbD0iI0VFRSIgZD0iTTg3IDEzaDE0MHYxNkg4N3ptMCAyNWgxMjZ2MTFIODd6bTAgMzFoMzN2MThIODd6Ii8+PHBhdGggc3Ryb2tlPSIjRjZGNkY2IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBkPSJNLjQ3MyAxLjVoMjkzLjAzMiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OCAzOTMpIj48cGF0aCBmaWxsPSIjRUVFIiBkPSJNMjY3IDgydi0zLjk5OGEuOTk5Ljk5OSAwIDEgMC0yIDBWODJoLTMuOTk4YS45OTkuOTk5IDAgMSAwIDAgMkgyNjV2My45OThhLjk5OS45OTkgMCAxIDAgMiAwVjg0aDMuOTk4YS45OTkuOTk5IDAgMSAwIDAtMkgyNjd6bS0xIDEyYy02LjA3NSAwLTExLTQuOTI1LTExLTExczQuOTI1LTExIDExLTExIDExIDQuOTI1IDExIDExLTQuOTI1IDExLTExIDExeiIvPjxyZWN0IHdpZHRoPSI3NCIgaGVpZ2h0PSI3NCIgeD0iMSIgeT0iMTMiIGZpbGw9IiNGNkY2RjYiIHJ4PSIyIi8+PHBhdGggZmlsbD0iI0VFRSIgZD0iTTg3IDEzaDE0MHYxNkg4N3ptMCAyNWgxMjZ2MTFIODd6bTAgMzFoMzN2MThIODd6Ii8+PHBhdGggc3Ryb2tlPSIjRjZGNkY2IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBkPSJNLjQ3MyAxLjVoMjkzLjAzMiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OCA1MDkpIj48cGF0aCBmaWxsPSIjRUVFIiBkPSJNMjY3IDgydi0zLjk5OGEuOTk5Ljk5OSAwIDEgMC0yIDBWODJoLTMuOTk4YS45OTkuOTk5IDAgMSAwIDAgMkgyNjV2My45OThhLjk5OS45OTkgMCAxIDAgMiAwVjg0aDMuOTk4YS45OTkuOTk5IDAgMSAwIDAtMkgyNjd6bS0xIDEyYy02LjA3NSAwLTExLTQuOTI1LTExLTExczQuOTI1LTExIDExLTExIDExIDQuOTI1IDExIDExLTQuOTI1IDExLTExIDExeiIvPjxyZWN0IHdpZHRoPSI3NCIgaGVpZ2h0PSI3NCIgeD0iMSIgeT0iMTMiIGZpbGw9IiNGNkY2RjYiIHJ4PSIyIi8+PHBhdGggZmlsbD0iI0VFRSIgZD0iTTg3IDEzaDE0MHYxNkg4N3ptMCAyNWgxMjZ2MTFIODd6bTAgMzFoMzN2MThIODd6Ii8+PHBhdGggc3Ryb2tlPSIjRjZGNkY2IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBkPSJNLjQ3MyAxLjVoMjkzLjAzMiIvPjwvZz48cGF0aCBmaWxsPSIjRUVFIiBkPSJNNTAgMjIyaDI5djE2SDUwem0zOSAzNWgyOXYxNkg4OXpNOSAyNjdoNTB2MTVIOXptMCA1NGg1MHYxNUg5em0wIDQ5aDUwdjE1SDl6bTAgMTAxaDUwdjE1SDl6bTAtNDloNTB2MTVIOXptMCAxMDFoNTB2MTVIOXptMCA1MGg1MHYxNUg5em0xNjYtMzUxaDI5djE2aC0yOXptMTI2IDBoMjl2MTZoLTI5eiIvPjxwYXRoIGZpbGw9IiNGNUY1RjUiIGQ9Ik0yIDU1NmgzNzV2NDdIMnoiLz48L2c+PC9zdmc+" alt="" />

    </div>
  )
})
export default Skeleton