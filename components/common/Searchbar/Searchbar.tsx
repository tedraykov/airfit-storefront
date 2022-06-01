import { FC, useEffect, useMemo } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.scss'
import { useRouter } from 'next/router'
import SearchIcon from '@components/icons/Search'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  return useMemo(
    () => (
      <div
        className={cn(
          'relative text-sm bg-accents-1 text-base w-full transition-colors duration-150',
          className
        )}
      >
        <label className="hidden" htmlFor={id}>
          Search
        </label>
        <input
          id={id}
          className={s.input}
          placeholder="Търси продукти в сайта..."
          defaultValue={router.query.q}
          onKeyUp={(e) => {
            e.preventDefault()

            if (e.key === 'Enter') {
              const q = e.currentTarget.value

              router.push(
                {
                  pathname: `/search`,
                  query: q ? { q } : {},
                },
                undefined,
                { shallow: true }
              )
            }
          }}
        />
        <div className={s.iconContainer}>
          <SearchIcon className={s.icon} />
        </div>
      </div>
    ),
    [className, id, router]
  )
}

export default Searchbar
