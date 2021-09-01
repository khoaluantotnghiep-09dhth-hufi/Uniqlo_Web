import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.facebook.com/taquangtrung.115/" target="_blank" rel="noopener noreferrer">Tạ Quang Trung</a>
        <span className="ml-1">&copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Khóa Luận Tốt Nghiệp</span>
        <a href="#"  rel="noopener noreferrer">React JS</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
