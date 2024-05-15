import { FunctionComponent, useEffect } from 'react'

import { Button } from 'components/ui/button'

import { sendMassage } from 'lib/analytics'
import { Link } from 'react-router-dom'

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  useEffect(() => {
    sendMassage('Alarm Clock - About', 'Someone checked out!')
  }, [])

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-32">
      <h1 className="text-3xl font-bold">About!</h1>
      <p className="mt-4">
        This is an alarm clock ⏱️, a small side project. 😊
        <br />
        Alarms are stored in your local storage; works only if the tab is
        opened; will send you alert; won't send you notification.
      </p>
      <p className="mt-4">
        Made with ❣️ by{' '}
        <a href="https://github.com/RohitKaushal7" className="font-semibold">
          Rohit Kaushal
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>
        <Link to="https://rohitkaushal.dev">
          <Button variant="secondary">My Portfolio</Button>
        </Link>
        <Link to="https://github.com/RohitKaushal7">
          <Button variant="secondary">Github/RohitKaushal7</Button>
        </Link>
      </div>
    </div>
  )
}

export default About
