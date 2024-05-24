const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请输入账号'
    }
    const resp = await API.exists(val)
    if (resp.data) {
        //账号已存在
        return '该账号已被占用，请重新选择一个账号'
    }
})

const nicknameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '请输入昵称'
    }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '请输入密码'
    }
})

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '请输入确认密码'
    }
    if (val !== loginPwdValidator.input.value) {
        return '两次密码输入不一致，请重新输入'
    }
})

const form = $('.user-form')

form.onsubmit = async function (e) {
    e.preventDefault()
    const result = await FieldValidator.validate(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    )
    if (!result) {
        return //验证未通过
    }
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    const resp = await API.reg(data)
    if (resp.code === 0) {
        alert('注册成功，点击确定后跳转到登录页面')
        location.href = './login.html'
    }
}