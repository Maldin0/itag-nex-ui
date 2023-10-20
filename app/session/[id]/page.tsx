import React from 'react'

type Props = {
    params: any;
}

export default function session({ params }: Props) {
  return (
      <div>Session ID: {params.id}</div>
  )
}