import { MenuAppBar } from './components/MenuAppBar'

interface Props {}
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <MenuAppBar />
      <main>{children}</main>
    </>
  )
}
