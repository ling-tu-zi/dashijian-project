const form = layui.form

form.verify({
  nickname: val => {
    if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  email: [/@/, '邮箱格式输入错误'],
})

const initUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    data: null,
    success: res => {
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      //   console.log(data)
      form.val('formUserInfo', data)
    },
  })
}

initUserInfo()

$('#resetBtn').click(function (e) {
  e.preventDefault()
  initUserInfo()
})

$('.layui-form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: form.val('formUserInfo'),
    success: res => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message)
      window.parent.getUserInfo()
    },
  })
})
