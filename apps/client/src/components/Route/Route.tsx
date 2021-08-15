import React from 'react'
import * as rrd from 'react-router-dom'
import { Path } from '../../types/path.type'

export type RouteProps = Omit<rrd.RouteProps, 'path'> & { path: Path }

export const Route = (props: rrd.RouteProps) => {
  return <rrd.Route {...props} />
}
