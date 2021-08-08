import React from 'react'
import * as rrd from 'react-router-dom'

export type RedirectProps = Omit<rrd.RedirectProps, 'to'> & { to: Path }

export const Redirect = ({ ...props }: RedirectProps) => {
  return <rrd.Redirect {...props} />
}
