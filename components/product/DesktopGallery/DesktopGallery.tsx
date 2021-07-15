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
    <div className={s.root}>
      <Gallery>
        {images.map((img, index) => (
          <Item original={img.url} width={1500} height={1500} key={img.url}>
            {(props) => (
              <div ref={props.ref as any}>
                <Image
                  onClick={props.open}
                  unoptimized={true}
                  className={s.img}
                  src={img.large}
                  alt={img.alt || 'Product Image'}
                  width={800}
                  height={800}
                  priority={index === 0}
                  placeholder={'blur'}
                  blurDataURL={img.thumbnail}
                />
              </div>
            )}
          </Item>
        ))}
      </Gallery>
    </div>
  )
}
