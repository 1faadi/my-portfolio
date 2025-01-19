import React from 'react'
import { RiReactjsLine } from 'react-icons/ri'
import { TbBrandNextjs } from 'react-icons/tb'
import { SiMongodb } from 'react-icons/si'
import { DiRedis } from 'react-icons/di'
import { FaNodeJs } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { FaLaravel } from "react-icons/fa6";
import { motion } from "motion/react"
import { GrMysql } from "react-icons/gr";
import { FaBootstrap } from "react-icons/fa6";
import { FaPhp } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse"
    },
  }
})

const Technologies = () => {
  return (
    <div className='border-b border-neutral-800 pb-24'>
      <motion.h1 
      whileInView={{opacity:1, y:0}}
      initial={{opacity: 0, y:-100}}
      transition={{duration: 1.5}}
      className='my-20 text-center text-4xl'>Technologies</motion.h1>
      <motion.div whileInView={{opacity:1, x:0}}
      initial={{opacity:0 , x:-100}}
      transition={{duration: 1.5}}
      className='flex flex-wrap items-center justify-center gap-4'>
        <motion.div
          variants={iconVariants(2.5)}
          initial="initial"
          animate="animate"
          className='rounded-2xl border-4 border-neutral-800 p-4'>
          <RiReactjsLine className='text-7xl text-cyan-400' />
        </motion.div>
        <motion.div
        variants={iconVariants(3)}
        initial="initial"
        animate="animate"
        className='rounded-2xl border-4 border-neutral-800 p-4'>
          <FaLaravel  className='text-7xl text-red-600' />
        </motion.div>
        <motion.div 
        variants={iconVariants(5)}
        initial="initial"
        animate="animate"
        className='rounded-2xl border-4 border-neutral-800 p-4'>
          <FaBootstrap className='text-7xl text-purple-600' />
        </motion.div>
        <motion.div
        variants={iconVariants(2)}
        initial="initial"
        animate="animate"
        className='rounded-2xl border-4 border-neutral-800 p-4'>
          <FaPhp className='text-7xl text-blue-300' />
        </motion.div>
        <motion.div
        variants={iconVariants(6)}
        initial="initial"
        animate="animate"
        className='rounded-2xl border-4 border-neutral-800 p-4'>
          <IoLogoJavascript className='text-7xl text-yellow-300' />
        </motion.div>
        <motion.div
        variants={iconVariants(4)}
        initial="initial"
        animate="animate"
        className='rounded-2xl border-4 border-neutral-800 p-4'>
          <GrMysql className='text-7xl text-sky-800' />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Technologies
