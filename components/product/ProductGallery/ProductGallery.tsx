import React, { FC, MutableRefObject, useEffect, useState } from 'react'

import { ProductImage } from '@commerce/types'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import { Gallery, Item } from 'react-photoswipe-gallery'
import PhotoSwipe, { Options } from 'photoswipe'
import Portal from '@reach/portal'

interface Props {
  images: ProductImage[]
  selectedImageIndex?: number
  isOpen?: boolean
  onClose: (idx: number) => void
}

export const ProductGallery: FC<Props> = ({
  images,
  selectedImageIndex = 0,
  isOpen,
  onClose,
}) => {
  const [activeImage, setActiveImage] =
    useState<MutableRefObject<HTMLElement>>()

  useEffect(() => {
    if (!!activeImage) {
      activeImage.current.click()
    }
  }, [activeImage])

  function addCloseListeners(photoswipe: PhotoSwipe<Options>) {
    photoswipe.listen('destroy', () => onClose(photoswipe.getCurrentIndex()))
    photoswipe.listen('close', () => onClose(photoswipe.getCurrentIndex()))
  }

  return (
    <>
      {isOpen && (
        <Portal>
          <Gallery onOpen={addCloseListeners}>
            {images.map(({ url }, index) => (
              <Item original={url} width={1500} height={1500} key={url}>
                {({ ref, open }) => {
                  if (index === selectedImageIndex) setActiveImage(ref)
                  return <span ref={ref} onClick={open} />
                }}
              </Item>
            ))}
          </Gallery>
        </Portal>
      )}
    </>
  )
}
