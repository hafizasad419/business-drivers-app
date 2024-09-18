import { motion } from 'framer-motion'
import React from 'react'

function JobsPosted() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >JobsPosted
    </motion.div>
  )
}

export default JobsPosted