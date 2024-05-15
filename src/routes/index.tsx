import { FunctionComponent } from 'react'

import { Button } from 'components/ui'

import { Link } from 'react-router-dom'

interface IndexRouteProps {}

const IndexRoute: FunctionComponent<IndexRouteProps> = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 py-32">
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <div className="mt-8 flex gap-4">
        <Link to="/about">
          <Button>About</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default IndexRoute
