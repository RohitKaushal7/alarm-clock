import { FunctionComponent } from 'react'

import { Button } from 'components/ui'

import { Link } from 'react-router-dom'

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 py-32">
      <h1 className="text-3xl font-bold">About!</h1>
      <div className="mt-8 flex gap-4">
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>
        <Link to="/404">
          <Button variant="primary" className="!bg-neutral-400">
            404
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default About
