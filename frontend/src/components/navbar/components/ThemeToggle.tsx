import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../theme-provider'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className='mr-4 flex space-x-4'>
      {theme === 'dark' ? (
        <motion.div className='cursor-pointer rounded-full p-2 hover:bg-accent'>
          <Sun className='cursor-pointer text-primary' onClick={() => setTheme('light')} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className='cursor-pointer rounded-full p-2 hover:bg-secondary'
        >
          <Moon className='cursor-pointer text-foreground' onClick={() => setTheme('dark')} />
        </motion.div>
      )}
    </div>
  )
}

export default ThemeToggle
