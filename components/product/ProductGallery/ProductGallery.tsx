import type { Dispatch, FC, MutableRefObject, SetStateAction } from 'react'
import { useState, useEffect } from 'react'
import { CatalogProduct } from '@graphql/schema'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import {
  KeenSliderInstance,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'
import Image from 'next/image'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Button } from '@components/ui'
import useUI from '@hooks/useUI'
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
  onActive: (activeIndex: number) => void
): KeenSliderPlugin {
  return (slider) => {
    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      onActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        const next = main.animator.targetIdx || 0
        onActive(main.track.absToRel(next))
        slider.moveToIdx(next)
      })
    })
  }
}

function LazyLoadPlugin(
  setLoaded: Dispatch<SetStateAction<{ [key: number]: boolean }>>
): KeenSliderPlugin {
  return (slider) => {
    slider.on('animationStarted', (main) => {
      const next = main.animator.targetIdx || 0
      const relativeNext = main.track.absToRel(next)
      setLoaded((loaded) => {
        if (!loaded[relativeNext]) {
          const newLoaded = { ...loaded }
          newLoaded[relativeNext] = true
          return newLoaded
        }
        return loaded
      })
    })
  }
}

type ProductGalleryProps = {
  product: CatalogProduct
}

const ProductGallery: FC<ProductGalleryProps> = ({ product }) => {
  const { isAtLeastTablet } = useUI()
  const [loaded, setLoaded] = useState<{ [key: number]: boolean }>({ 0: true })
  const [activeThumbnail, setActiveThumbnail] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
    },
    [LazyLoadPlugin(setLoaded)]
  )

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: isAtLeastTablet ? 6 : 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef, setActiveThumbnail)]
  )

  return (
    <div className="w-full">
      <Gallery>
        <div
          className={`
            keen-slider relative h-[400px] rounded-b-xl cursor-zoom-in lg:shadow-lg
            md:h-[600px] md:rounded-xl
            lg:h-[500px]
            xl:h-[600px]
            2xl:h-[640px]
          `}
          ref={sliderRef}
        >
          {product.media.map((imageInfo, index) => (
            <Item
              cropped
              original={imageInfo.URLs.original}
              thumbnail={imageInfo.URLs.medium}
              width="1000"
              height="1000"
              key={`${product.slug}-${index}`}
            >
              {({ ref, open }) => (
                // @ts-ignore
                <div className="keen-slider__slide w-full" ref={ref}>
                  {loaded[index] && (
                    <Image
                      onClick={open}
                      src={imageInfo.URLs.large}
                      alt={`${product.slug}-${index}`}
                      layout="fill"
                      objectFit="cover"
                      blurDataURL={imageInfo.URLs.thumbnail}
                      placeholder="blur"
                    />
                  )}
                </div>
              )}
            </Item>
          ))}
          <Button
            onClick={instanceRef.current?.prev}
            aria-label="Previous Product Image"
            variant="outlined"
            round
            color="secondary"
            className="absolute top-1/2 left-4 p-4 bg-gray-500/20"
          >
            <ArrowBackIosRoundedIcon />
          </Button>
          <Button
            onClick={instanceRef.current?.next}
            aria-label="Next Product Image"
            variant="outlined"
            color="secondary"
            round
            className="absolute top-1/2 right-4 p-4 bg-gray-500/20"
          >
            <ArrowForwardIosRoundedIcon />
          </Button>
        </div>
      </Gallery>
      <div className="p-4 lg:px-0">
        <div ref={thumbnailRef} className="keen-slider thumbnail">
          {product.media.map((imageInfo, index) => (
            <div
              className={twMerge(
                'keen-slider__slide rounded-lg border border-primary',
                cn({
                  ['border-secondary']: activeThumbnail === index,
                })
              )}
              key={`${product.slug}-${index}-thumbnail`}
            >
              <Image
                src={imageInfo.URLs.thumbnail}
                alt={`${product.slug}-${index}-thumbnail`}
                layout="responsive"
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
