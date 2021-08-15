import { MenuAppBar } from './components/MenuAppBar'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <MenuAppBar />
      <main>{children}</main>
    </>
  )
}
