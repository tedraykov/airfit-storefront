import { FC } from 'react'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import Link from '@components/ui/Link'
import SidebarLayout from '@components/common/SidebarLayout'
import s from './MobileDrawer.module.scss'

export interface Link {
  href: string
  label: string
}

interface NavDrawerProps {
  links?: Link[]
  open: boolean
  onClose: () => void
}

const MobileDrawer: FC<NavDrawerProps> = ({ links, open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <SidebarLayout handleClose={onClose} className={s.layout}>
        <List>
          {links?.map((l) => (
            <Link href={l.href} key={l.href}>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                }}
                className="text-lg"
                onClick={onClose}
              >
                {l.label}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </SidebarLayout>
    </Drawer>
  )
}

export default MobileDrawer
