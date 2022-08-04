const getUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    data: null,
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: res => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message)
      renderAvatar(res.data)
    },
  })
}

const renderAvatar = data => {
  let name = data.nickname || data.username
  //   console.log(name)
  // 设置欢迎文本
  $('#welcome').html('欢迎' + name)
  if (data.user_pic !== null) {
    $('.layui-nav-img').attr('src', data.user_pic)
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let firstName = name[0].toUpperCase()
    // console.log(firstName)
    $('.text-avatar').html(firstName)
  }
}

getUserInfo()

$('#exitBtn').click(function () {
  layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
    location.href = '/login.html'
    localStorage.removeItem('token')
    layer.close(index)
  })
})
