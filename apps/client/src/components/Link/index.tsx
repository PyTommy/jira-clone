import React from 'react'
import rrd from 'react-router-dom'
import { Path } from '../../types/path.type'

type Props = Omit<rrd.LinkProps, 'to'> & { to: Path }
export const Link: React.FC<Props> = (props) => <Link {...props} />
