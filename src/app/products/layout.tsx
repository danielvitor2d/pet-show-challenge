import { ReactElement } from "react"

interface Props {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen px-12 py-40">
      {children}
    </div>
  )
}