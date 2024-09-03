import React from 'react';
import {LoginForm} from '../../utils';
import { motion } from 'framer-motion';

function LoginPage() {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen flex items-center justify-center bg-white">
      <LoginForm />
    </motion.div>
  );
}


export default LoginPage;