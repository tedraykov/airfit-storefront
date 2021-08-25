import { FC } from 'react'

interface LogoProps {
  className?: string
  reversedColor?: boolean
  width?: string
  height?: string
}

const Logo: FC<LogoProps> = ({
  className = '',
  reversedColor = false,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="150"
    height="30"
    viewBox="0 0 397 105"
    fill="none"
  >
    <path
      d="M59.8906 83.0469H32.6797L23.75 104H1.8125L50.6094 1.625H69.1016L82.5312 104H61.6484L59.8906 83.0469ZM40.0625 65.8203H58.4844L55.6016 29.5391L40.0625 65.8203ZM113.75 104H93.5703L111.359 1.625H131.539L113.75 104ZM168.242 66.5938H157.977L151.508 104H131.328L149.047 1.625L179.984 1.69531C189.125 1.97656 196.133 4.78906 201.008 10.1328C205.883 15.4766 207.945 22.7656 207.195 32C206.023 46.0156 199.648 55.7656 188.07 61.25L198.336 102.875V104H176.68L168.242 66.5938ZM160.93 49.3672L171.547 49.5078C176.422 49.4141 180.266 47.4922 183.078 43.7422C185.891 39.9453 187.273 34.9297 187.227 28.6953C187.039 22.5547 184.344 19.2969 179.141 18.9219L166.273 18.8516L160.93 49.3672ZM267.875 62.2344H236.727L229.484 104H209.305L227.023 1.625H282.148L279.125 18.8516H244.25L239.68 45.0781H270.898L267.875 62.2344ZM297.547 104H277.367L295.156 1.625H315.336L297.547 104ZM392.117 18.8516H367.578L352.812 104H332.562L347.328 18.8516H323.141L326.164 1.625H395.141L392.117 18.8516Z"
      fill={reversedColor ? 'var(--primary)' : 'var(--secondary)'}
    />
    <path
      d="M59.8906 83.0469L60.8871 82.9633L60.8102 82.0469H59.8906V83.0469ZM32.6797 83.0469V82.0469H32.0188L31.7597 82.6548L32.6797 83.0469ZM23.75 104V105H24.4109L24.6699 104.392L23.75 104ZM1.8125 104L0.9098 103.57L0.228064 105H1.8125V104ZM50.6094 1.625V0.625H49.9782L49.7067 1.19473L50.6094 1.625ZM69.1016 1.625L70.0931 1.49493L69.979 0.625H69.1016V1.625ZM82.5312 104V105H83.671L83.5228 103.87L82.5312 104ZM61.6484 104L60.6519 104.084L60.7288 105H61.6484V104ZM40.0625 65.8203L39.1433 65.4266L38.5463 66.8203H40.0625V65.8203ZM58.4844 65.8203V66.8203H59.567L59.4812 65.7411L58.4844 65.8203ZM55.6016 29.5391L56.5984 29.4599L54.6823 29.1454L55.6016 29.5391ZM59.8906 82.0469H32.6797V84.0469H59.8906V82.0469ZM31.7597 82.6548L22.8301 103.608L24.6699 104.392L33.5996 83.4389L31.7597 82.6548ZM23.75 103H1.8125V105H23.75V103ZM2.7152 104.43L51.5121 2.05527L49.7067 1.19473L0.9098 103.57L2.7152 104.43ZM50.6094 2.625H69.1016V0.625H50.6094V2.625ZM68.1101 1.75507L81.5397 104.13L83.5228 103.87L70.0931 1.49493L68.1101 1.75507ZM82.5312 103H61.6484V105H82.5312V103ZM62.6449 103.916L60.8871 82.9633L58.8941 83.1305L60.6519 104.084L62.6449 103.916ZM40.0625 66.8203H58.4844V64.8203H40.0625V66.8203ZM59.4812 65.7411L56.5984 29.4599L54.6047 29.6183L57.4875 65.8995L59.4812 65.7411ZM54.6823 29.1454L39.1433 65.4266L40.9817 66.214L56.5208 29.9328L54.6823 29.1454ZM113.75 104V105H114.591L114.735 104.171L113.75 104ZM93.5703 104L92.5851 103.829L92.3816 105H93.5703V104ZM111.359 1.625V0.625H110.518L110.374 1.4538L111.359 1.625ZM131.539 1.625L132.524 1.7962L132.728 0.625H131.539V1.625ZM113.75 103H93.5703V105H113.75V103ZM94.5555 104.171L112.345 1.7962L110.374 1.4538L92.5851 103.829L94.5555 104.171ZM111.359 2.625H131.539V0.625H111.359V2.625ZM130.554 1.4538L112.765 103.829L114.735 104.171L132.524 1.7962L130.554 1.4538ZM168.242 66.5938L169.218 66.3737L169.042 65.5938H168.242V66.5938ZM157.977 66.5938V65.5938H157.135L156.991 66.4233L157.977 66.5938ZM151.508 104V105H152.35L152.493 104.17L151.508 104ZM131.328 104L130.343 103.829L130.14 105H131.328V104ZM149.047 1.625L149.049 0.625002L148.205 0.623085L148.062 1.45446L149.047 1.625ZM179.984 1.69531L180.015 0.695786L180.001 0.695347L179.987 0.695314L179.984 1.69531ZM207.195 32L208.192 32.0833L208.192 32.081L207.195 32ZM188.07 61.25L187.642 60.3463L186.904 60.6961L187.099 61.4894L188.07 61.25ZM198.336 102.875H199.336V102.754L199.307 102.636L198.336 102.875ZM198.336 104V105H199.336V104H198.336ZM176.68 104L175.704 104.22L175.88 105H176.68V104ZM160.93 49.3672L159.945 49.1947L159.742 50.3515L160.916 50.3671L160.93 49.3672ZM171.547 49.5078L171.534 50.5077L171.55 50.5079L171.566 50.5076L171.547 49.5078ZM183.078 43.7422L183.878 44.3422L183.882 44.3374L183.078 43.7422ZM187.227 28.6953L188.227 28.6878L188.226 28.6763L188.226 28.6648L187.227 28.6953ZM179.141 18.9219L179.213 17.9245L179.179 17.9221L179.146 17.9219L179.141 18.9219ZM166.273 18.8516L166.279 17.8516L165.434 17.847L165.288 18.6791L166.273 18.8516ZM168.242 65.5938H157.977V67.5938H168.242V65.5938ZM156.991 66.4233L150.522 103.83L152.493 104.17L158.962 66.7642L156.991 66.4233ZM151.508 103H131.328V105H151.508V103ZM132.313 104.171L150.032 1.79554L148.062 1.45446L130.343 103.829L132.313 104.171ZM149.045 2.625L179.982 2.69531L179.987 0.695314L149.049 0.625002L149.045 2.625ZM179.954 2.69484C188.899 2.9701 195.622 5.71249 200.269 10.8068L201.747 9.45885C196.644 3.86563 189.351 0.983028 180.015 0.695786L179.954 2.69484ZM200.269 10.8068C204.908 15.8916 206.933 22.8789 206.199 31.919L208.192 32.081C208.958 22.6523 206.858 15.0615 201.747 9.45885L200.269 10.8068ZM206.199 31.9167C205.053 45.6192 198.862 55.0318 187.642 60.3463L188.498 62.1537C200.435 56.4995 206.994 46.4121 208.192 32.0833L206.199 31.9167ZM187.099 61.4894L197.365 103.114L199.307 102.636L189.041 61.0106L187.099 61.4894ZM197.336 102.875V104H199.336V102.875H197.336ZM198.336 103H176.68V105H198.336V103ZM177.655 103.78L169.218 66.3737L167.267 66.8138L175.704 104.22L177.655 103.78ZM160.916 50.3671L171.534 50.5077L171.56 48.5079L160.943 48.3673L160.916 50.3671ZM171.566 50.5076C176.735 50.4082 180.872 48.3499 183.878 44.3422L182.278 43.1422C179.659 46.6345 176.109 48.4199 171.528 48.508L171.566 50.5076ZM183.882 44.3374C186.859 40.3179 188.275 35.07 188.227 28.6878L186.227 28.7028C186.272 34.7894 184.922 39.5727 182.275 43.147L183.882 44.3374ZM188.226 28.6648C188.129 25.4696 187.376 22.8715 185.835 21.009C184.274 19.1225 182.018 18.1267 179.213 17.9245L179.069 19.9193C181.466 20.0921 183.159 20.9126 184.294 22.2839C185.448 23.6793 186.137 25.7804 186.227 28.7258L188.226 28.6648ZM179.146 17.9219L166.279 17.8516L166.268 19.8515L179.135 19.9219L179.146 17.9219ZM165.288 18.6791L159.945 49.1947L161.915 49.5397L167.258 19.0241L165.288 18.6791ZM267.875 62.2344V63.2344H268.714L268.86 62.4079L267.875 62.2344ZM236.727 62.2344V61.2344H235.885L235.741 62.0635L236.727 62.2344ZM229.484 104V105H230.326L230.47 104.171L229.484 104ZM209.305 104L208.319 103.829L208.117 105H209.305V104ZM227.023 1.625V0.625H226.182L226.038 1.45446L227.023 1.625ZM282.148 1.625L283.133 1.79787L283.339 0.625H282.148V1.625ZM279.125 18.8516V19.8516H279.965L280.11 19.0244L279.125 18.8516ZM244.25 18.8516V17.8516H243.409L243.265 18.6799L244.25 18.8516ZM239.68 45.0781L238.695 44.9064L238.49 46.0781H239.68V45.0781ZM270.898 45.0781L271.883 45.2517L272.09 44.0781H270.898V45.0781ZM267.875 61.2344H236.727V63.2344H267.875V61.2344ZM235.741 62.0635L228.499 103.829L230.47 104.171L237.712 62.4052L235.741 62.0635ZM229.484 103H209.305V105H229.484V103ZM210.29 104.171L228.009 1.79554L226.038 1.45446L208.319 103.829L210.29 104.171ZM227.023 2.625H282.148V0.625H227.023V2.625ZM281.163 1.45213L278.14 18.6787L280.11 19.0244L283.133 1.79787L281.163 1.45213ZM279.125 17.8516H244.25V19.8516H279.125V17.8516ZM243.265 18.6799L238.695 44.9064L240.665 45.2498L245.235 19.0232L243.265 18.6799ZM239.68 46.0781H270.898V44.0781H239.68V46.0781ZM269.914 44.9046L266.89 62.0608L268.86 62.4079L271.883 45.2517L269.914 44.9046ZM297.547 104V105H298.388L298.532 104.171L297.547 104ZM277.367 104L276.382 103.829L276.178 105H277.367V104ZM295.156 1.625V0.625H294.315L294.171 1.4538L295.156 1.625ZM315.336 1.625L316.321 1.7962L316.525 0.625H315.336V1.625ZM297.547 103H277.367V105H297.547V103ZM278.352 104.171L296.141 1.7962L294.171 1.4538L276.382 103.829L278.352 104.171ZM295.156 2.625H315.336V0.625H295.156V2.625ZM314.351 1.4538L296.562 103.829L298.532 104.171L316.321 1.7962L314.351 1.4538ZM392.117 18.8516V19.8516H392.957L393.102 19.0244L392.117 18.8516ZM367.578 18.8516V17.8516H366.737L366.593 18.6807L367.578 18.8516ZM352.812 104V105H353.654L353.798 104.171L352.812 104ZM332.562 104L331.577 103.829L331.374 105H332.562V104ZM347.328 18.8516L348.313 19.0224L348.516 17.8516H347.328V18.8516ZM323.141 18.8516L322.156 18.6787L321.95 19.8516H323.141V18.8516ZM326.164 1.625V0.625H325.324L325.179 1.45213L326.164 1.625ZM395.141 1.625L396.126 1.79787L396.331 0.625H395.141V1.625ZM392.117 17.8516H367.578V19.8516H392.117V17.8516ZM366.593 18.6807L351.827 103.829L353.798 104.171L368.563 19.0224L366.593 18.6807ZM352.812 103H332.562V105H352.812V103ZM333.548 104.171L348.313 19.0224L346.343 18.6807L331.577 103.829L333.548 104.171ZM347.328 17.8516H323.141V19.8516H347.328V17.8516ZM324.126 19.0244L327.149 1.79787L325.179 1.45213L322.156 18.6787L324.126 19.0244ZM326.164 2.625H395.141V0.625H326.164V2.625ZM394.156 1.45213L391.132 18.6787L393.102 19.0244L396.126 1.79787L394.156 1.45213Z"
      fill={reversedColor ? 'var(--primary)' : 'var(--secondary)'}
    />
  </svg>
)

export default Logo
