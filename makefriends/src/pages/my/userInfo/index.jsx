import { NavBar, Icon, List, InputItem } from 'antd-mobile';
import { useEffect, useState } from 'react'
import { localDB } from 'wsm-common'
import { getAttribute } from '@api/basic/LoginApi'
function UserInfo(props) {
    let prop = props;
    const [age, Stateage] = useState('')
    const [avatar, Stateavatar] = useState('')
    const [birthday, Statebirthday] = useState('')
    const [email, Stateemail] = useState('')
    const [home, Statehome] = useState('')
    const [label, Statelabel] = useState('')
    const [sex, Statesex] = useState('')
    const [signature, Statesignature] = useState('')
    const [user_name, StateuserName] = useState('')

    useEffect(() => {
        let info;
        async function getinfo() {
            await getAttribute('age,avatar,birthday,email,home,label,sex,signature,user_name').then(res => {
                info = res.data.data
                Stateage(info.age)
                Stateavatar(info.avatar)
                Statebirthday(info.birthday)
                Stateemail(info.email)
                Statehome(info.home)
                Statelabel(info.label)
                Statesex(info.sex)
                Statesignature(info.signature)
                StateuserName(info.user_name)
            })
        }
        if(localDB.get('makeFriendsToken')){
            getinfo();
        }else{
            prop.history.replace('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => props.history.go(-1)}
            >修改个人信息</NavBar>
            <List renderHeader={() => '个人信息如下'}>
                <InputItem
                    type="text"
                    value={user_name}
                >用户名</InputItem>
                <InputItem
                    type="email"
                    value={email}

                    placeholder="xxx@126.com"
                >email</InputItem>
                <InputItem
                    type="text"
                    value={sex}

                >性别</InputItem>
                <InputItem
                    type="number"
                    value={age}
                >年龄</InputItem>
                <InputItem
                    type="text"
                    value={signature}

                >个性签名</InputItem>
                <InputItem
                    type="text"
                    value={birthday}
                >生日</InputItem>
                <InputItem
                    type="text"
                    value={home}
                >住址</InputItem>
                <InputItem
                    type="text"
                    value={label}

                >标签</InputItem>
                <InputItem
                    value={avatar}
                    type="text"
                >头像</InputItem>
            </List>
        </>
    )
}
export default UserInfo