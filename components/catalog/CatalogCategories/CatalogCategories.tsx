import type { FC } from 'react'
import { useState } from 'react'
import cn from 'classnames'
import { NavigationTree } from '@graphql/schema'
import { useRouter } from 'next/router'
import Link from 'next/link'

type CatalogCategoriesProps = {
  categories: NavigationTree
}

const CatalogCategories: FC<CatalogCategoriesProps> = ({ categories }) => {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const { tag } = useRouter().query
  const activeCategory = categories?.items.find((category) => {
    return category.navigationItem.data.url.replace('/', '') === tag
  })

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  return (
    <div className="relative inline-block w-full mb-6">
      <div className="lg:hidden">
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={(e) => handleClick(e, 'categories')}
            className={`flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3
              bg-accent-0 text-sm leading-5 font-medium text-accent-4
              hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal
              active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150
            `}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {activeCategory?.navigationItem.data.contentForLanguage
              ? `Категория: ${activeCategory?.navigationItem.data.contentForLanguage}`
              : 'Всички категории'}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      <div
        className={`
          origin-top-left absolute lg:relative left-0 mt-2
          w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block
          ${activeFilter !== 'categories' || !toggleFilter ? 'hidden' : ''}
        `}
      >
        <div className="rounded-sm bg-primary shadow-xs lg:bg-none lg:shadow-none z-20">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <ul>
              <li
                className={cn(
                  `w-fit text-sm leading-5 text-accent-4
                  lg:text-base lg:no-underline lg:font-bold
                  lg:tracking-wide hover:bg-accent-1
                  lg:hover:bg-transparent hover:text-accent-8
                  focus:outline-none focus:bg-accent-1
                  focus:text-accent-8`,
                  {
                    underline:
                      !activeCategory?.navigationItem.data.contentForLanguage,
                  }
                )}
              >
                <Link href={{ pathname: `/search` }}>
                  <a
                    onClick={(e) => handleClick(e, 'categories')}
                    className={
                      'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                    }
                  >
                    Всички категории
                  </a>
                </Link>
              </li>
              {categories?.items.map((category) => (
                <li
                  key={category.navigationItem._id}
                  className={cn(
                    `block text-sm leading-5 text-accent-4
                          hover:bg-accent-1 lg:hover:bg-transparent
                          hover:text-accent-8 focus:outline-none
                          focus:bg-accent-1 focus:text-accent-8`,
                    {
                      underline:
                        activeCategory?.navigationItem._id ===
                        category?.navigationItem._id,
                    }
                  )}
                >
                  <Link
                    href={{
                      pathname: `/search${category?.navigationItem.data.url}`,
                    }}
                  >
                    <a
                      onClick={(e) => handleClick(e, 'categories')}
                      className={
                        'w-fit lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                      }
                    >
                      {category.navigationItem.data.contentForLanguage}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogCategories
