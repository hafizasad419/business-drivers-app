import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaExclamationCircle, FaHome, FaRedo, FaArrowLeft } from 'react-icons/fa'

class ErrorBoundaryFallback extends React.Component {
  render() {
    const { error, errorInfo, resetError, goBack } = this.props

    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <FaExclamationCircle className="mx-auto h-12 w-12 text-orange" />
            <h2 className="mt-6 text-3xl font-extrabold text-darkBlue">
              Oops! Something went wrong
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We're sorry, but an unexpected error occurred.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <p className="text-md text-gray-500">
              Don't worry, it's not your fault. Our team has been notified and we're working on fixing it.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={goBack}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-lightBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Go Back
              </button>
              <Link
                to="/"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-lightBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue transition-colors duration-200"
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <button
                onClick={resetError}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-lightBlue bg-white border-lightBlue hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue transition-colors duration-200"
              >
                <FaRedo className="mr-2" />
                Try Again
              </button>
            </div>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 text-left">
              <h3 className="text-lg font-medium text-darkBlue">Error Details:</h3>
              <pre className="mt-2 text-sm text-gray-500 overflow-auto max-h-40 bg-gray-100 p-2 rounded">
                {error && error.toString()}
                <br />
                {errorInfo && errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [errorInfo, setErrorInfo] = React.useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    setHasError(false)
  }, [location.pathname])

  const errorHandler = (error, errorInfo) => {
    setHasError(true)
    setError(error)
    setErrorInfo(errorInfo)
    // You can log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo)
  }

  const resetError = () => {
    setHasError(false)
    setError(null)
    setErrorInfo(null)
    window.location.reload()
  }

  const goBack = () => {
    navigate(-1)
    setHasError(false)
    setError(null)
    setErrorInfo(null)
  }

  if (hasError) {
    return (
      <ErrorBoundaryFallback
        error={error}
        errorInfo={errorInfo}
        resetError={resetError}
        goBack={goBack}
      />
    )
  }

  return (
    <React.Fragment>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { errorHandler })
          : child
      )}
    </React.Fragment>
  )
}

export default ErrorBoundary