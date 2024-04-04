import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
  <img
    src="https://images.unsplash.com/photo-1566231270035-0aaca1fd2bbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJhbCUyMGhlYWxpbmd8ZW58MHx8MHx8fDA%3D"
    alt="Not Found Image"
    className="h-64 w-full object-cover"
  />

  <div className="flex flex-1 items-center justify-center">
    <div className="mx-auto max-w-xl px-4 py-8 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        We can't find that page.
      </h1>

      <p className="mt-4 text-gray-500">
        Return home to start from the beginning.
      </p>

      <Link
        to={'/'}
        className="mt-6 inline-block rounded bg-[#D88552] px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Go Back Home
      </Link>
    </div>
  </div>
</div>
  )
}

export default ErrorPage
