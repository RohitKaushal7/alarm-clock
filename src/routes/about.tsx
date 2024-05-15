import { FunctionComponent } from 'react'

import { Button } from 'components/ui'

import { Link } from 'react-router-dom'

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 py-32">
      <h1 className="text-3xl font-bold">About!</h1>
      <p className="mt-4">
        Made with ❣️ by{' '}
        <a href="https://github.com/RohitKaushal7" className="font-semibold">
          Rohit Kaushal
        </a>
        .
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>
        <Link to="/404">
          <Button className="!bg-neutral-400">404</Button>
        </Link>
      </div>
    </div>
  )
}

export default About
