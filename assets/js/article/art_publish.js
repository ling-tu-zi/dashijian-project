const form = layui.form

const renderCateslist = () => {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: res => {
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      let htmlStr = template('tpl-cate', data)
      $('[name=cate_id]').html(htmlStr)
      form.render()
    },
  })
}

renderCateslist()

// 初始化富文本编辑器
initEditor()

// 1. 初始化图片裁剪器
const $image = $('#image')

// 2. 裁剪选项
const options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview',
}

// 3. 初始化裁剪区域
$image.cropper(options)

$('#chooseImageBtn').click(function () {
  $('#coverFile').click()
})

$('#coverFile').change(function (e) {
  let files = e.target.files
  if (files.length === 0) return layer.msg('请选择上传的文件')

  let file = files[0]

  let imgUrl = URL.createObjectURL(file)

  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgUrl) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
})

let art_state = '已发布'

$('#saveBtn').click(function () {
  art_state = '草稿'
  console.log(art_state)
})

$('.layui-form').submit(function (e) {
  e.preventDefault()
  let fd = new FormData($(this)[0])
  fd.append('state', art_state)

  $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280,
    })
    .toBlob(function (blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      // 5. 将文件对象，存储到 fd 中
      fd.append('cover_img', blob)
      publishArticle(fd)
    })
})

const publishArticle = fd => {
  $.ajax({
    type: 'POST',
    url: '/my/article/add',
    data: fd,
    // 注意：如果向服务器提交的是 FormData 格式的数据，
    // 必须添加以下两个配置项
    contentType: false,
    processData: false,
    success: res => {
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      // 等待文章列表完成
      location.href = '/article/art_list.html'
    },
  })
}
