import React from 'react'
import { PostJob } from '../../Components'
import { motion } from 'framer-motion'

function PostJobPage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <PostJob />
        </motion.div>

    )
}

export default PostJobPage