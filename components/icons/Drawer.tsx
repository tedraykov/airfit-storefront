const Drawer = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="12"
      viewBox="0 0 25 12"
      fill="none"
      {...props}
    >
      <rect width="25" height="2" rx="1" fill="currentColor" />
      <rect x="5" y="10" width="20" height="2" rx="1" fill="currentColor" />
    </svg>
  )
}

export default Drawer
