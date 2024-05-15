import { FunctionComponent } from 'react'

interface IndexRouteProps {}

const IndexRoute: FunctionComponent<IndexRouteProps> = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col p-4">
      <h1 className="mt-16 text-3xl font-bold">Alarm</h1>
      <h1 className="text-xs text-neutral-400">Ring in 10 hours 14 minutes</h1>
    </div>
  )
}

export default IndexRoute
