import React from 'react'
import Button from 'antd/lib/button/button';
import styles from './style.less';

const TheButton = () => (
  <div className={styles.Container}>
    <Button>Small Button</Button>
    <Button className={styles.BigBtn}>Big Button</Button>
  </div>
)

export default TheButton