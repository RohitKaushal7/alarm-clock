import { FunctionComponent } from 'react'

interface Page404Props {}

const Page404: FunctionComponent<Page404Props> = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-4xl font-bold text-red-500">404</div>
      <div className="mt-4 text-xl text-neutral-300">Page Not Found!</div>
    </div>
  )
}

export default Page404
