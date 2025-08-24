import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

interface PrismCodeProps {
  language: string
  code: string
}

const PrismCode: React.FC<PrismCodeProps> = ({ language, code }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <pre className={`language-${language}`} tabIndex={0}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}

export default PrismCode
