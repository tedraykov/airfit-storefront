import React, { FC } from 'react'
import { ProductImage } from '@commerce/types'
import { Gallery, Item } from 'react-photoswipe-gallery'
import s from '@components/product/ProductSlider/ProductSlider.module.css'
import Image from 'next/image'

interface Props {
  images: ProductImage[]
}

export const DesktopGallery: FC<Props> = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ url, alt }, index) => (
        <Item original={url} width={1500} height={1500} key={url}>
          {(props) => (
            <div ref={props.ref as any}>
              <Image
                onClick={props.open}
                className={s.img}
                src={url!}
                alt={alt || 'Product Image'}
                width={800}
                height={800}
                priority={index === 0}
                quality="85"
              />
            </div>
          )}
        </Item>
      ))}
    </Gallery>
  )
}
