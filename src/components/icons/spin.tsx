export function SpinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" stroke="#000">
      <g fill="none" fill-rule="evenodd" stroke-width="4">
        <circle cx="20" cy="20" r="18" stroke-opacity="0.2"/>
        <path d="M38 20c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="1s"
            repeatCount="indefinite"/>
        </path>
      </g>
    </svg>
  )
}