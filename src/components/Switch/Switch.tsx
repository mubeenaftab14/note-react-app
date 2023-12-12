import React from 'react'
import styles from './Switch.module.scss'
import classnames from 'classnames'

interface Iprops {
  checked?: boolean
  disabled?: boolean
  icon?: boolean
  onChange?: () => void
}

const Swtich: React.FC<Iprops> = ({ checked, icon, onChange }) => {
  const sliderStyles = classnames(styles.slider, {
    [styles.iconSlider]: icon,
  })

  const inputStyles = classnames(styles.input, {
    [styles.iconInput]: icon,
  })
  return (
    <label className={styles.label} >
      <input type="checkbox" checked={checked} className={inputStyles} onChange={onChange}/>
      <span className={sliderStyles}></span>
    </label>
  )
}
export default Swtich
