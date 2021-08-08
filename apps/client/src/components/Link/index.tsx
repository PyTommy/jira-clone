import React from 'react'
import rrd from 'react-router-dom'

type Props = Omit<rrd.LinkProps, 'to'> & { to: Path }
export const Link: React.FC<Props> = (props) => <Link {...props} />
