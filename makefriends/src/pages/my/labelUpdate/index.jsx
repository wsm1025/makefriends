import { useEffect, useState } from 'react';
import { Tag,NavBar,Icon } from 'antd-mobile';
import { localDB } from 'wsm-common'
function LableUpdate(props) {
  const [info, StateInfo] = useState('ERROR')
  useEffect(() => {
    StateInfo(JSON.parse(localDB.get('info')).label)
  }, [])
  return (
    <>
     <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => props.history.go(-1)}
        >修改标签</NavBar>
      {info.split(',').map((e) => {
        return (
          <Tag data-seed="logId">{e}</Tag>  
            )
      }
      )}
    </>
  )
}
export default LableUpdate