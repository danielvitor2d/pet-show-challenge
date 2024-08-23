import { ReactElement } from "react"

interface Props {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen px-12 py-40 flex flex-col items-center justify-start">
      {children}
    </div>
  )
}